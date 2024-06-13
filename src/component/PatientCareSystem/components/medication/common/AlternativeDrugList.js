import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  React.useEffect(() => {
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

export default function AlternativeDrugList(props) {
  const [rowIndex, setRowIndex] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState({});

  const { dataResult, arrowKeyName, setArrowKeyName } = props;

  const removeHeaders = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(props.data.result[0]);

  const headers = removeHeaders(allHeaders, [
    "Id",
    "IsTemplate",
    "IsCultureTest",
    "LabWorkOrderTestId",
  ]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleClickRow = (index, row) => {
    setRowIndex(index);
  };

  const handleClick = (row, id, index) => {
    setArrowKeyName("Right Arrow Key");
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

  //key press up down
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const arrowLeftPressed = useKeyPress("ArrowLeft");
  const enterPressed = useKeyPress("Enter");

  React.useEffect(() => {
    if (arrowLeftPressed === true) {
      setArrowKeyName("Left Arrow Key");
      setRowIndex(-1);
      setSelectedObj(null);
    }
  }, [arrowLeftPressed]);

  React.useEffect(() => {
    if (enterPressed === true) {
      if (selectedObj !== null) {
        props.setSelectedRow(selectedObj);
      }
      setArrowKeyName("Enter Key Pressed");
    }
  }, [enterPressed, selectedObj]);

  React.useEffect(() => {
    if (arrowUpPressed) {
      let rIndex = rowIndex;

      //decrement index by 1
      if (arrowKeyName === "Right Arrow Key" || arrowKeyName === "") {
        if (rowIndex !== 0) {
          rIndex = rIndex - 1;
          setSelectedObj(dataResult[rIndex]);
          setRowIndex(rIndex);
        }
      }
    }
  }, [arrowUpPressed]);

  React.useEffect(() => {
    if (arrowDownPressed) {
      let rIndex = rowIndex;

      //increment index by 1 when the value of rowIndex is not equal to the value of last index of dataResult array
      if (arrowKeyName === "Right Arrow Key" || arrowKeyName === "") {
        if (rowIndex !== dataResult.length - 1) {
          rIndex = rIndex + 1;
          setSelectedObj(dataResult[rIndex]);
          setRowIndex(rIndex);
        }
      }
    }
  }, [arrowDownPressed]);

  React.useEffect(() => {
    if (arrowKeyName === "Left Arrow Key") {
      setRowIndex(-1);
      setSelectedObj(null);
    }
    if (arrowKeyName === "Right Arrow Key" && selectedObj === null) {
      setRowIndex(0);
      setSelectedObj(dataResult[0]);
    }
  }, [arrowKeyName]);

  const tableRef = React.useRef(null);

  React.useEffect(() => {
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
    <div className="w-auto grid">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          {/* pagination */}

          <TableContainer
            ref={tableRef}
            sx={{
              "&::-webkit-scrollbar": {
                width: 6,
                height: 1,
                overflow: "auto",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#838a8a",
                borderRadius: "50px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "white",

                borderRadius: "50px",
                border: "0.5px solid #cfd3d3",
              },
            }}
            className="rounded h-30 2xl:h-40 overflow-scroll"
          >
            <Table size="small" component={Paper}>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "#F1F1F1",
                    },
                  }}
                >
                  {headers.map((header, index) => (
                    <TableCell className="whitespace-nowrap" key={index}>
                      <span className="text-gray-600 font-bold">{header}</span>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {dataResult.map((row, index) => {
                  {
                    const isItemSelected = isSelected(row.Id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, row, row.Id);
                          handleClickRow(index, row);
                        }}
                        onKeyPress={(event) => {
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
                        style={{
                          backgroundColor: rowIndex === index ? "#FFC44B" : "",
                        }}
                      >
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={row.id}
                            >
                              {row[header]}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
