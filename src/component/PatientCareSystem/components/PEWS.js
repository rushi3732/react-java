import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CheckBoxField from "../../../Common Components/FormFields/CheckBoxField";
import CommonButton from "../../../Common Components/commonbutton/CommonButton";

export default function Pews(props) {
  const { setPEWSScore, closePEWSModal } = props;
  const schema = yup.object().shape({});
  
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const defaultValues = {
    playingappropriate: false,
    sleeping: false,
    irritable: false,
    reducedresponsetopain: false,
    lethargicConfused: false,
    pink: false,
    capillaryrefill12sec: false,
    paledusky: false,
    capillaryrefill3sec: false,
    graycyanotic: false,
    capillaryrefill4sec: false,
    tachycardianormal20abovenormalrate: false,
    grayccyanoticandmolted: false,
    capillaryrefill5secabove: false,
    tachycardianormal30abovenormalrate: false,
    bradcardia: false,
    withnormalparameters: false,
    normal10parameters: false,
    usingaccessorymuscles: false,
    Fio302Or3Litersmin: false,
    normal20parameters: false,
    retractions: false,
    Fio402Or6Litersmin: false,
    blownormalparametersretractions: false,
    Fio502Or8Liters: false,
  };
  const [behaviorScore, setBehaviorScore] = useState(null);
  const [cardiovascularScore, setcardiovascularScore] = useState(null);
  const [respiratoryScore, setRespiratoryScore] = useState(null);
  const [finalData, setFinalData] = useState();
  const [requiredArrBehaviour, setRequiredArrBehaviour] = useState([]);

  const [requiredArrcardiovascularScore, setRequiredArrcardiovascularScore] =
    useState([]);
  const [requiredArrRespiatoryScore, setRequiredArrRespiratoryScore] = useState(
    []
  );

  let finalPews;
  let alertMsg = "";
  const pewsDivElement = useRef();
  //calculate BehaviorScore
  const handleCheckBehaviorScore = (checkBoxVal) => {
    let behaviorScoreFlag = watch(checkBoxVal);

    if (behaviorScoreFlag === true) {
      let temp = [...requiredArrBehaviour];
      temp.push(`${checkBoxVal}`);
      setRequiredArrBehaviour(temp);
    }
    if (behaviorScoreFlag === false) {
      let temp = [...requiredArrBehaviour];
      let filterArr = temp.filter((item) => item !== checkBoxVal);

      setRequiredArrBehaviour(filterArr);
    }
  };

  //calculate cardiovascular Score
  const handleCheckCardiovascularScore = (checkBoxVal) => {
    let cardiovascularScoreFlag = watch(checkBoxVal);
    if (cardiovascularScoreFlag === true) {
      let temp = [...requiredArrcardiovascularScore];
      temp.push(`${checkBoxVal}`);
      setRequiredArrcardiovascularScore(temp);
    }
    if (cardiovascularScoreFlag === false) {
      let temp = [...requiredArrcardiovascularScore];
      let filterArr = temp.filter((item) => item !== checkBoxVal);
      setRequiredArrcardiovascularScore(filterArr);
    }
  };

  // calculate RespiatoryScore
  const handleCheckRespiratoryScore = (checkBoxVal) => {
    let RespiratoryScoreFlag = watch(checkBoxVal);
    if (RespiratoryScoreFlag === true) {
      let temp = [...requiredArrRespiatoryScore];
      temp.push(`${checkBoxVal}`);
      setRequiredArrRespiratoryScore(temp);
    }
    if (RespiratoryScoreFlag === false) {
      let temp = [...requiredArrRespiatoryScore];
      let filterArr = temp.filter((item) => item !== checkBoxVal);
      setRequiredArrRespiratoryScore(filterArr);
    }
  };
  const onSubmitDataHandler = (data) => {
    if (finalPews >= 5) {
      alertMsg = "Please Call Doctor For Consultation";
    } else {
      alertMsg = "No Need to Call Doctor For Consultation";
    }

    let postPewsObj = {
      alert: alertMsg, behaviourScore: behaviorScore, behaviourValue: requiredArrBehaviour, cardiovascularScore: cardiovascularScore, cardiovascularValues: requiredArrcardiovascularScore, pews: finalPews, repositoryScore: respiratoryScore, repositoryValues: requiredArrRespiatoryScore,
    };

    setFinalData(postPewsObj);
  };
  useEffect(() => {
    const subscription = watch((data) => {
      switch (true) {
        case data.playingappropriate:
          setBehaviorScore(0);
          break;
        case data.sleeping:
          setBehaviorScore(1);
          break;
        case data.irritable:
          setBehaviorScore(2);
          break;
        case data.reducedresponsetopain || data.lethargicConfused:
          setBehaviorScore(3);
          break;
        default:
          setBehaviorScore(null);
      }

      switch (true) {
        case data.pink || data.capillaryrefill12sec:
          setcardiovascularScore(0);
          break;
        case data.paledusky || data.capillaryrefill3sec:
          setcardiovascularScore(1);
          break;
        case data.graycyanotic ||
          data.capillaryrefill4sec ||
          data.tachycardianormal20abovenormalrate:
          setcardiovascularScore(2);
          break;
        case data.grayccyanoticandmolted ||
          data.capillaryrefill5secabove ||
          data.tachycardianormal30abovenormalrate ||
          data.bradcardia:
          setcardiovascularScore(3);
          break;
        default:
          setcardiovascularScore(null);
      }

      switch (true) {
        case data.withnormalparameters:
          setRespiratoryScore(0);
          break;
        case data.normal10parameters ||
          data.usingaccessorymuscles ||
          data.Fio302Or3LitersminFlag:
          setRespiratoryScore(1);
          break;
        case data.normal20parameters ||
          data.retractions ||
          data.Fio402Or6Litersmin:
          setRespiratoryScore(2);
          break;
        case data.blownormalparametersretractions || data.Fio502Or8Liters:
          setRespiratoryScore(3);
          break;
        default:
          setRespiratoryScore(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  useEffect(() => {
    calculatePews(behaviorScore, cardiovascularScore, respiratoryScore);
  }, [behaviorScore, cardiovascularScore, respiratoryScore]);

  function calculatePews(behaviorScore, cardiovascularScore, respiratoryScore) {
    if (
      Number(behaviorScore) < 5 &&
      Number(cardiovascularScore) < 5 &&
      Number(respiratoryScore) < 5
    ) {
      setBehaviorScore(behaviorScore);
      setcardiovascularScore(cardiovascularScore);
      setRespiratoryScore(respiratoryScore);
      finalPews =
        Number(behaviorScore) +
        Number(cardiovascularScore) +
        Number(respiratoryScore);

      pewsDivElement.current.innerHTML = `Final Mews is ===0 ${finalPews}`;
    } else if (
      Number(behaviorScore) > 0 &&
      Number(cardiovascularScore) > 0 &&
      Number(respiratoryScore) > 0
    ) {
      finalPews =
        Number(behaviorScore) +
        Number(cardiovascularScore) +
        Number(respiratoryScore);

      pewsDivElement.current.innerHTML = `Final Mews is > 0 ${finalPews}`;
    }

    if (finalPews >= 5) {
      pewsDivElement.current.innerHTML = `
          <div class="flex items-center">
            <p class="text-gray-700 px-2 font-bold text-sm">PEWS</p>
            <div class="w-8 h-8 mr-2 rounded-full border-2 border-red-500 flex justify-center bg-red-500 items-center text-white">
              <p class="text-white text-sm py-2">${finalPews}</p>
            </div>
            <fieldset class="border -mt-1 border-red-500 ml-2 text-left lg:px-4 mt-1 md:px-4 md:ml-0 md:mr-0 rounded bg-red">
              <legend class="md:mx-2 md:px-2 lg:px-2 font-bold  text-red-500 text-sm">Alert</legend>
              <p class="font-bold text-red-500 text-sm">Please Call Doctor For Consultation</p>
            </fieldset>
          </div>
        `;
    } else if (finalPews < 5) {
      pewsDivElement.current.innerHTML = `
          <div class="flex items-center">
            <p class="text-gray-700 px-2 font-bold text-sm">PEWS</p>
            <div class="w-8 h-8 mr-2 rounded-full border-2 border-green-500 flex justify-center bg-green-500 items-center">
              <p class="text-white text-sm py-2">${finalPews}</p>
            </div>
            <fieldset class="border  -mt-1 ml-2 border-green-300 text-left lg:px-4 mt-1 md:px-4 md:ml-0 md:mr-0 rounded bg-green">
              <legend class="md:mx-2 md:px-2 lg:px-2 font-bold  text-green-500 text-sm">Alert</legend>
              <p class="font-bold text-green-500 text-sm">No Need to Call Doctor For Consultation</p>
            </fieldset>
          </div>
        `;
    }
  }

  //Behavior score watch
  let playingAppropriateFlag =
    watch("sleeping") ||
    watch("irritable") ||
    watch("reducedresponsetopain") ||
    watch("lethargicConfused");

  let sleepingFlag =
    watch("playingappropriate") ||
    watch("irritable") ||
    watch("reducedresponsetopain") ||
    watch("lethargicConfused");

  let irritableFlag =
    watch("playingappropriate") ||
    watch("sleeping") ||
    watch("reducedresponsetopain") ||
    watch("lethargicConfused");

  let reducedresponsetopainFlag =
    watch("playingappropriate") || watch("sleeping") || watch("irritable");

  let lethargicConfusedFlag =
    watch("playingappropriate") || watch("sleeping") || watch("irritable");

  //Cardiovascula score watch

  let pinkFlag =
    watch("paledusky") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");
  let capillaryrefill12secFlag =
    watch("paledusky") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let paleduskyFlag =
    watch("capillaryrefill12sec") ||
    watch("pink") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let capillaryrefill3secFlag =
    watch("pink") ||
    watch("capillaryrefill12sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let graycyanoticFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");
  let capillaryrefill4secFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");
  let tachycardianormal20abovenormalrateFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("grayccyanoticandmolted") ||
    watch("capillaryrefill5secabove") ||
    watch("tachycardianormal30abovenormalrate") ||
    watch("bradcardia");

  let grayccyanoticandmoltedFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");

  let capillaryrefill5secaboveFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");

  let tachycardianormal30abovenormalrateFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");

  let bradcardiaFlag =
    watch("pink") ||
    watch("paledusky") ||
    watch("capillaryrefill12sec") ||
    watch("capillaryrefill3sec") ||
    watch("graycyanotic") ||
    watch("capillaryrefill4sec") ||
    watch("tachycardianormal20abovenormalrate");
  let withnormalparametersFlag =
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("normal20parameters") ||
    watch("Fio302Or3Litersmin") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");

  let normal10parametersFlag =
    watch("withnormalparameters") ||
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let usingaccessorymusclesFlag =
    watch("withnormalparameters") ||
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let Fio302Or3LitersminFlag =
    watch("withnormalparameters") ||
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");

  let normal20parametersFlag =
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let retractionsFlag =
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");

  let Fio402Or6LitersminFlag =
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin") ||
    watch("blownormalparametersretractions") ||
    watch("Fio502Or8Liters");
  let blownormalparametersretractionsFlag =
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin");
  let Fio502Or8LitersFlag =
    watch("normal20parameters") ||
    watch("Fio402Or6Litersmin") ||
    watch("retractions") ||
    watch("withnormalparameters") ||
    watch("normal10parameters") ||
    watch("usingaccessorymuscles") ||
    watch("Fio302Or3Litersmin");

  return (
    <div className="w-full pt-1">
      <form
        onSubmit={handleSubmit(onSubmitDataHandler)}
        className="grid grid-cols-1 md:grid-cols-1 gap-1"
      >
        <fieldset className="border border-gray-300 text-left lg:px-4 md:px-4 md:ml-0 md:mr-0 px-1 rounded bg-white">
          <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-base text-gray-700">
            <div className="flex flex-wrap items-center">
              {" "}
              Behavior Score{" "}
              {playingAppropriateFlag ||
                sleepingFlag ||
                irritableFlag ||
                reducedresponsetopainFlag ||
                lethargicConfusedFlag ? (
                <p className="w-5 h-5 ml-2 rounded-full flex justify-center bg-[#0081a8] items-center text-white text-xs">
                  {" "}
                  {behaviorScore}
                </p>
              ) : null}{" "}
            </div>
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 md:gap-4">
            <div>
              <div className="font-base ">0</div>
              <fieldset
                disabled={playingAppropriateFlag}
                className="font-base "
                onChange={() => {
                  let checkBox = "playingappropriate";
                  handleCheckBehaviorScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="playingappropriate"
                  label="Playing / Appropriate"
                  className={`text-gray-500 text-sm ${playingAppropriateFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="w-full">
              <div className="font-base">1</div>
              <fieldset
                disabled={sleepingFlag}
                onChange={() => {
                  let checkBox = "sleeping";
                  handleCheckBehaviorScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="sleeping"
                  label="Sleeping"
                  value="Sleeping"
                  error={errors.sleeping}
                  className={`text-gray-500 text-sm ${sleepingFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="w-full">
              <div className="font-base">2</div>
              <fieldset
                disabled={irritableFlag}
                onChange={() => {
                  let checkBox = "irritable";
                  handleCheckBehaviorScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="irritable"
                  label="Irritable"
                  value="Irritable"
                  error={errors.irrritable}
                  className={`text-gray-500 text-sm ${irritableFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">3</div>
              <fieldset
                disabled={reducedresponsetopainFlag}
                onChange={() => {
                  let checkBox = "reducedresponsetopain";
                  handleCheckBehaviorScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="reducedresponsetopain"
                  label="Reduced Response To Pain"
                  error={errors.reducedresponsetopain}
                  className={`text-gray-500 text-sm ${reducedresponsetopainFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={lethargicConfusedFlag}
                onChange={() => {
                  let checkBox = "lethargicConfused";
                  handleCheckBehaviorScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="lethargicConfused"
                  label="Lethargic / Confused"
                  error={errors.lethargicConfused}
                  className={`text-gray-500 text-sm ${lethargicConfusedFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 text-left lg:px-4 md:px-4 md:ml-0 md:mr-0  px-1 rounded bg-white">
          <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-base text-gray-700">
            <div className="flex items-center">
              Cardiovascular Score
              {pinkFlag ||
                capillaryrefill12secFlag ||
                paleduskyFlag ||
                capillaryrefill3secFlag ||
                graycyanoticFlag ||
                capillaryrefill4secFlag ||
                tachycardianormal20abovenormalrateFlag ||
                grayccyanoticandmoltedFlag ||
                capillaryrefill5secaboveFlag ||
                tachycardianormal30abovenormalrateFlag ||
                bradcardiaFlag ? (
                <p className="w-5 h-5 ml-2 rounded-full flex justify-center bg-[#0081a8] items-center text-white text-xs">
                  {cardiovascularScore}
                </p>
              ) : null}
            </div>
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="">
              <div className="font-base ">0</div>
              <fieldset
                disabled={pinkFlag}
                onChange={() => {
                  let checkBox = "pink";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="pink"
                  label="Pink"
                  value="Pink"
                  className={`text-gray-500 text-sm ${pinkFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={capillaryrefill12secFlag}
                onChange={() => {
                  let checkBox = "capillaryrefill12sec";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="capillaryrefill12sec"
                  label="Capillary Refill 1-2 sec"
                  value="Capillary Refill 1-2 sec"
                  className={`text-gray-500 text-sm ${capillaryrefill12secFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">1</div>
              <fieldset
                disabled={paleduskyFlag}
                onChange={() => {
                  let checkBox = "paledusky";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="paledusky"
                  label="Pale or Dusky"
                  value="Pale or Dusky"
                  className={`text-gray-500 text-sm ${paleduskyFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={capillaryrefill3secFlag}
                onChange={() => {
                  let checkBox = "capillaryrefill3sec";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="capillaryrefill3sec"
                  label="Capillary Refill 3 sec"
                  className={`text-gray-500 text-sm ${capillaryrefill3secFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">2</div>
              <fieldset
                disabled={graycyanoticFlag}
                onChange={() => {
                  let checkBox = "graycyanotic";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="graycyanotic"
                  label="Grey Or Cyanotic"
                  className={`text-gray-500 text-sm ${graycyanoticFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={capillaryrefill4secFlag}
                onChange={() => {
                  let checkBox = "capillaryrefill4sec";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="capillaryrefill4sec"
                  label="Capillary Refill 4 sec"
                  className={`text-gray-500 text-sm ${capillaryrefill4secFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={tachycardianormal20abovenormalrateFlag}
                onChange={() => {
                  let checkBox = "tachycardianormal20abovenormalrate";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="tachycardianormal20abovenormalrate"
                  label="Tachycardia of 20 Above Normal Rate"
                  value="Tachycardia of 20 Above Normal Rate"
                  className={`text-gray-500 text-sm ${tachycardianormal20abovenormalrateFlag
                    ? "flex-start !important"
                    : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">3</div>
              <fieldset
                disabled={grayccyanoticandmoltedFlag}
                onChange={() => {
                  let checkBox = "grayccyanoticandmolted";
                  handleCheckCardiovascularScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="grayccyanoticandmolted"
                  label="Gray Ccyanotic and Molted"
                  value="Gray Ccyanotic and Molted"
                  className={`text-gray-500 text-sm ${grayccyanoticandmoltedFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <div className="py-2 whitespace-wrap">
                <fieldset
                  disabled={capillaryrefill5secaboveFlag}
                  onChange={() => {
                    let checkBox = "capillaryrefill5secabove";
                    handleCheckCardiovascularScore(checkBox);
                  }}
                >
                  <CheckBoxField
                    control={control}
                    name="capillaryrefill5secabove"
                    label="Capillary Refill 5 sec and Above"
                    value="Capillary Refill 5 sec and Above"
                    className={`text-gray-500 text-sm ${capillaryrefill5secaboveFlag
                      ? "flex-start !important"
                      : ""
                      } pr-0 mr-0`}
                  />
                </fieldset>
              </div>
              <div className="py-2">
                <fieldset
                  disabled={bradcardiaFlag}
                  onChange={() => {
                    let checkBox = "bradcardia";
                    handleCheckCardiovascularScore(checkBox);
                  }}
                >
                  <CheckBoxField
                    control={control}
                    name="bradcardia"
                    label="Bradcardia"
                    value="Bradcardia"
                    className={`text-gray-500 text-sm ${bradcardiaFlag ? "flex-start !important" : ""
                      } pr-0 mr-0`}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 text-left lg:px-4 md:px-4 md:ml-0 md:mr-0  px-1 rounded bg-white">
          <legend className="md:mx-2 md:px-2 lg:px-2 font-bold text-base text-gray-700">
            <div className="flex flex-nowrap items-center">
              Respiratory Score
              {withnormalparametersFlag ||
                normal10parametersFlag ||
                usingaccessorymusclesFlag ||
                Fio302Or3LitersminFlag ||
                normal20parametersFlag ||
                retractionsFlag ||
                Fio402Or6LitersminFlag ||
                blownormalparametersretractionsFlag ||
                Fio502Or8LitersFlag ? (
                <p className="w-5 h-5 ml-2 rounded-full flex justify-center bg-[#0081a8] items-center text-white text-xs">
                  {respiratoryScore}
                </p>
              ) : null}
            </div>
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <div className="">
              <div className="font-base">0</div>
              <fieldset
                disabled={withnormalparametersFlag}
                onChange={() => {
                  let checkBox = "withnormalparameters";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="withnormalparameters"
                  label="With Normal Parameters"
                  value="With Normal Parameters"
                  className={`text-gray-500 text-sm ${withnormalparametersFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">1</div>
              <fieldset
                disabled={normal10parametersFlag}
                onChange={() => {
                  let checkBox = "normal10parameters";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="normal10parameters"
                  label="> 10 Normal Parameters"
                  value="> 10 Normal Parameters"
                  className={`text-gray-500 text-sm ${normal10parametersFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={usingaccessorymusclesFlag}
                onChange={() => {
                  let checkBox = "usingaccessorymuscles";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="usingaccessorymuscles"
                  label="Using Accessory Muscles"
                  value="Using Accessory Muscles"
                  className={`text-gray-500 text-sm ${usingaccessorymusclesFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                className="whitespace-nowrap"
                disabled={Fio302Or3LitersminFlag}
                onChange={() => {
                  let checkBox = "Fio302Or3Litersmin";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="Fio302Or3Litersmin"
                  label="30 + %Fio2 Or 3 + Liters / min"
                  value="30 + %Fio2 Or 3 + Liters / min"
                  className={`text-gray-500 text-sm ${Fio302Or3LitersminFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">2</div>
              <fieldset
                disabled={normal20parametersFlag}
                onChange={() => {
                  let checkBox = "normal20parameters";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="normal20parameters"
                  label="> 20 Normal Parameters"
                  value="> 20 Normal Parameters"
                  className={`text-gray-500 text-sm ${normal20parametersFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={retractionsFlag}
                onChange={() => {
                  let checkBox = "retractions";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="retractions"
                  label="Retractions"
                  value="Retractions"
                  className={`text-gray-500 text-sm ${retractionsFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <fieldset
                disabled={Fio402Or6LitersminFlag}
                onChange={() => {
                  let checkBox = "Fio402Or6Litersmin";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="Fio402Or6Litersmin"
                  label="40 + %Fio2 Or 6 + Liters/min"
                  value="40 + %Fio2 Or 6 + Liters/min"
                  className={`text-gray-500 text-sm ${Fio402Or6LitersminFlag ? "flex-start !important" : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
            </div>
            <div className="">
              <div className="font-base">3</div>
              <fieldset
                disabled={blownormalparametersretractionsFlag}
                onChange={() => {
                  let checkBox = "blownormalparametersretractions";
                  handleCheckRespiratoryScore(checkBox);
                }}
              >
                <CheckBoxField
                  control={control}
                  name="blownormalparametersretractions"
                  label=">= Normal Parameters With Retractions"
                  value=">= Normal Parameters With Retractions"
                  className={`text-gray-500 text-sm ${blownormalparametersretractionsFlag
                    ? "flex-start !important"
                    : ""
                    } pr-0 mr-0`}
                />
              </fieldset>
              <div className="py-3 whitespace-wrap">
                <fieldset
                  disabled={Fio502Or8LitersFlag}
                  onChange={() => {
                    let checkBox = "Fio502Or8Liters";
                    handleCheckRespiratoryScore(checkBox);
                  }}
                >
                  <CheckBoxField
                    control={control}
                    name="Fio502Or8Liters"
                    label="50 + %Fio2 Or 8 + Liters / min"
                    value="50 + %Fio2 Or 8 + Liters / min"
                    className={`text-gray-500 text-sm ${Fio502Or8LitersFlag ? "flex-start !important" : ""
                      } pr-0 mr-0`}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 items-center justify-between">
          <div className="py-2">
            <div name="pews" id="pews" ref={pewsDivElement}></div>
          </div>
          <div className="flex justify-center md:justify-center lg:justify-end  gap-2">
            <CommonButton
              label="Reset"
              type="button"
              className="h-10 px-3 mx-4 border border-customRed bg-white text-customRed rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
              onClick={() => {
                reset(defaultValues);
              }}
            />
            <CommonButton
              label="Save"
              type="button"
              className="saveButton bg-customGreen text-white"
              onClick={() => {
                setPEWSScore(finalPews);
                closePEWSModal();
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
