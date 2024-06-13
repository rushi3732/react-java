import JoditEditor from "jodit-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

const Notes = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [logs, setLogs] = useState([]);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const onChange = useCallback(
    (newContent) => {
      setLogs([newContent]);
    },
    [logs, setLogs]
  );

  useEffect(() => {
    console.log("onChange = ", onChange);
  }, [onChange]);

  const appendLog = useCallback(
    (message) => {
      console.log("logs = ", logs);
      const newLogs = [...logs, message];
      setLogs(newLogs);
    },
    [logs]
  );

  const onBlur = useCallback((newContent) => {}, [appendLog, setContent]);

  return (
    <div className="mt-2">
      <div className="rounded border h-auto">
        <div className="bg-[#FFF1D7] sticky  p-1   shadow-md flex gap-8">
          <div className="flex items-center">
            <div className="text-sm  font-semibold flex items-center justify-start ml-2">
              Notes{" "}
            </div>
          </div>
        </div>
        <div className="h-[90%]">
          <JoditEditor
            value={content}
            config={config}
            tabIndex={1}
            onBlur={onBlur}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Notes;
