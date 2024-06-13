import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useReducer, useRef, useState } from "react";

const initialState = { selectedIndex: 0 };
let list = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "arrowUp":
      return {
        selectedIndex:
          state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1,
      };
    case "arrowDown":
      return {
        selectedIndex:
          state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0,
      };
    case "select":
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
};

export default function DrugList(props) {
  const [titleVal, setTitleVal] = useState("");
  const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
      const downHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
      const upHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };

      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [targetKey]);

    return keyPressed;
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [rowIndex, setRowIndex] = useState("");
  const [selectedObj, setSelectedObj] = useState(null);
  const { dataResult, selected, setSelected, arrowKeyName, setArrowKeyName } =
    props;

  const handleClickRow = (index, row) => {
    props.setGenericId(row.genericId);
    setRowIndex(index);
  };

  //event listener function to detect the click of the TableRow.
  const handleClick = (row, id, index) => {
    setArrowKeyName("Left Arrow Key");
    setSelectedObj(row);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    newSelected = newSelected.concat(id);
    if (selectedIndex === 0) {
      newSelected = [];
      setSelected(null);
    }
    setSelected(newSelected);
  };

  //the function to remove the headers that are not required.
  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, [
    "Value",
    "genericId",
    "Id",
    "isGeneric",
    "highRiskMedicine",
  ]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  //key press up down
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowRightPressed = useKeyPress("ArrowRight");
  const arrowLeftPressed = useKeyPress("ArrowLeft");
  const enterPressed = useKeyPress("Enter");

  useEffect(() => {
    if (arrowRightPressed === true) {
      setArrowKeyName("Right Arrow Key");
      setRowIndex(-1);
      setSelectedObj(null);
    }
  }, [arrowRightPressed]);

  useEffect(() => {
    if (enterPressed === true) {
      setArrowKeyName("Enter Key Pressed");
      if (selectedObj !== null) {
        props.setSelectedRow(selectedObj);
      }
    }
  }, [enterPressed, selectedObj]);

  useEffect(() => {
    if (arrowUpPressed) {
      let rIndex = rowIndex;

      //decrement index by 1
      if (arrowKeyName === "Left Arrow Key" || arrowKeyName === "") {
        if (rowIndex !== 0) {
          rIndex = rIndex - 1;
          setSelectedObj(dataResult[rIndex]);
          let requiredGenericId = dataResult[rIndex].genericId;
          props.setGenericId(requiredGenericId);
          setRowIndex(rIndex);
        }
      }
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed) {
      let rIndex = rowIndex;
      //increment index by 1 when the value of rowIndex is not equal to the value of last index of dataResult array
      if (arrowKeyName === "Left Arrow Key" || arrowKeyName === "") {
        if (rowIndex !== dataResult.length - 1) {
          rIndex = rIndex + 1;
          setSelectedObj(dataResult[rIndex]);
          let requiredGenericId = dataResult[rIndex].genericId;
          props.setGenericId(requiredGenericId);
          setRowIndex(rIndex);
        }
      }
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (arrowKeyName === "Right Arrow Key") {
      setRowIndex(-1);
      setSelectedObj(null);
    } else if (arrowKeyName === "Left Arrow Key" && selectedObj === null) {
      setRowIndex(0);
      setSelectedObj(dataResult[0]);
    }
  }, [arrowKeyName]);

  useEffect(() => {
    props.setGenericId(dataResult[0].genericId);
    setRowIndex(0);
    setSelectedObj(dataResult[0]);
    setArrowKeyName("Left Arrow Key");
  }, []);

  const tableRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const table = tableRef.current;
      if (table) {
        const currentScrollTop = table.scrollTop;

        if (event.key === "ArrowUp") {
          table.scrollTo({ top: currentScrollTop - 30, behavior: "smooth" });
        } else if (event.key === "ArrowDown") {
          table.scrollTo({ top: currentScrollTop + 30, behavior: "smooth" });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //table start
  return (
    <div className=" grid  gap-2">
      <Box
        sx={{
          width: "100%",
          overflowX: "scroll",
          "&::-webkit-scrollbar": {
            width: 7,
            height: 1,
            overflow: "auto",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
            borderRadius: "50px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#838a8a",

            borderRadius: "50px",
            border: "0.5px solid #cfd3d3",
          },
        }}
      >
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            ref={tableRef}
            sx={{
              "&::-webkit-scrollbar": {
                width: 7,
                height: 1,
                overflow: "auto",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "white",
                borderRadius: "50px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#838a8a",

                borderRadius: "50px",
                border: "0.5px solid #cfd3d3",
              },
            }}
            className="rounded h-32 2xl:h-40 overflow-scroll"
          >
            <Table
              component={Paper}
              Table
              size="small"
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      paddingY: 0.5,
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  {headers.map((header, index) => (
                    <TableCell className="whitespace-nowrap " key={index}>
                      <span className="text-gray-600 font-bold">{header}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataResult.map((row, index, i) => {
                  {
                    const isItemSelected = isSelected(row.Id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        onClick={(event) => {
                          handleClick(event, row, row.Id);
                          handleClickRow(index, row);
                          dispatch({ type: "select", payload: i });
                        }}
                        onKeyPress={(event) => {
                          event.preventDefault();
                          if (event.key === "Enter") {
                            setSelectedObj(row);
                          }
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.Id}
                        selected={isItemSelected}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        aria-pressed={i === state.selectedIndex}
                        style={{
                          backgroundColor: rowIndex === index ? "#FFC44B" : "",
                        }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              sx={{ maxWidth: 170, overflow: "hidden" }}
                              className="whitespace-nowrap overflow-ellipsis"
                              key={row.id}
                            >
                              {/* <Tooltip title={titleVal}> */}
                              <span
                                onMouseOver={() => {
                                  setTitleVal(row["Item Name"]);
                                }}
                                title={titleVal}
                              >
                                {row[header]}
                              </span>
                              {/* </Tooltip> */}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* //table end */}
        </Paper>
      </Box>
    </div>
  );
}
