import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Checkbox from "@mui/material/Checkbox";

//set descending sort order
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

//set sort desc
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const tableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
export default function OncologyCommonTransactionTable(props) {
  const {
    dataResult,
    setDataResult, //need to pass only if we want enable SelectAll checkbox functionality
    removeHeaders, //send array of headers which need to remove.  NOTE:send at least one header i.e. id
    tableClass, //required css for tableContainer.i.e. height ,etc.
    renderActions, //render Actions @1st column i.e.icons,checkboxes,etc.
    highlightRow, //default row highlighted,if not want to highlight set as false.
    customRowBgColor, //usefull when required another bg color of selected row than default.
    rowBackgroundColor, //use this to show conditional row bg color .
    handleSelectedRow, //get row onclick use this fn..
    editableColumns, //array of headers to make column editable
    renderInput, //actual content to render i.e. input,dropdown,checkbox,icon,etc
    enableSelectAll, ///to enable select all checkbox funtionality
  } = props;

  const [rowIndex, setRowIndex] = React.useState();

  //state varibale for the table
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const createSortHandler = (property) => (event) => {
    handleSortRequest(event, property);
  };

  //by default asc order
  const handleSortRequest = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const removeHeader = (headers, fieldToRemove) => {
    return headers.filter((v) => {
      return !fieldToRemove.includes(v);
    });
  };

  //set rows object to table
  const allHeaders = Object.keys(dataResult[0]);

  const headers = removeHeaders
    ? removeHeader(allHeaders, removeHeaders && removeHeaders)
    : allHeaders;

  // useEffect(() => {
  //   if (rowIndex !== -1) {
  //     setRowIndex(-1);
  //   }
  // }, [dataResult]);

  const handleSelectAll = () => {
    const allChecked = dataResult.every((row) => row.isChecked);
    console.log(allChecked);

    // Toggle isChecked for all rows
    const updatedDataResult = dataResult.map((row) => ({
      ...row,
      isChecked: !allChecked,
    }));

    setDataResult(updatedDataResult);
  };

  const handleRowSelect = (index) => {
    const updatedDataResult = [...dataResult];
    updatedDataResult[index] = {
      ...updatedDataResult[index],
      isChecked: !updatedDataResult[index].isChecked,
    };

    setDataResult(updatedDataResult);
  };

  return (
    <div className="grid w-auto">
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Paper sx={{ width: "100%", my: 1 }}>
          <TableContainer
            sx={{
              "&::-webkit-scrollbar": {
                width: 7,
                height: 10,
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#ebebeb",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7393b3",
                borderRadius: 4,
              },
            }}
            //   className="rounded lg:h-52 md:h-72"
            className={tableClass}
          >
            <Table
              size="small"
              stickyHeader
              aria-label="sticky table"
              sx={{
                border: 1,
                borderColor: "#e0e0e0",
                paddingY: "scroll",
                "&::-webkit-scrollbar": {
                  width: 7,
                  height: 10,
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#ebebeb",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#7393b3",
                  borderRadius: 4,
                },
              }}
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
                  {enableSelectAll && (
                    <TableCell>
                      <Checkbox
                        size="small"
                        checked={dataResult.every((row) => row.isChecked)}
                        onChange={handleSelectAll}
                        style={{ padding: 0 }}
                      />
                    </TableCell>
                  )}
                  {renderActions && (
                    <TableCell>
                      <span className="text-gray-600 font-bold whitespace-nowrap">
                        Actions
                      </span>
                    </TableCell>
                  )}
                  {headers.map((header, index) => (
                    <TableCell
                      sortDirection={orderBy === header ? order : false}
                      className="whitespace-nowrap capitalize"
                    >
                      <TableSortLabel
                        active={false}
                        direction={orderBy === header ? order : "asc"}
                        onClick={createSortHandler(header)}
                        key={index}
                      >
                        <span className="text-gray-600 font-bold">
                          {header}
                        </span>
                        {orderBy === header ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableSort(dataResult, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <TableRow
                        key={index}
                        hover={false}
                        style={{
                          backgroundColor:
                            (highlightRow === undefined ||
                              highlightRow === true) &&
                            rowIndex === index
                              ? customRowBgColor || "#FFC44B"
                              : rowBackgroundColor
                              ? rowBackgroundColor(row, index)
                              : "",
                        }}
                        sx={{
                          "& td": renderActions
                            ? {
                                paddingY: 0.2,
                              }
                            : { paddingY: 0.5 },
                        }}
                        onClick={() => {
                          setRowIndex(index);
                          {
                            handleSelectedRow && handleSelectedRow(row, index);
                          }
                        }}
                      >
                        {enableSelectAll && (
                          <TableCell>
                            <Checkbox
                              size="small"
                              checked={row.isChecked ? true : false}
                              onChange={() => handleRowSelect(index)}
                              style={{ padding: 0 }}
                            />
                          </TableCell>
                        )}
                        {renderActions && (
                          <TableCell>{renderActions(row, index)}</TableCell>
                        )}
                        {headers &&
                          headers.map((header, i) => (
                            <TableCell
                              className="whitespace-nowrap"
                              key={i}
                              onClick={() => {}}
                              style={{ padding: 4 }}
                            >
                              {editableColumns &&
                              editableColumns.includes(header)
                                ? renderInput(row, index, header)
                                : row[header] === true
                                ? "Yes"
                                : row[header] === false
                                ? "No"
                                : row[header]}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
