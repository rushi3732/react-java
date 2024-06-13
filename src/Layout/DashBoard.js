import React, { useState, useEffect } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Menu from "./Menu";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidHeartCircle } from "react-icons/bi";
import Tooltip from "@mui/material/Tooltip";
import {
  DocItHealth,
  LogOutIcon,
} from "../Common Components/assets/ipdassets/Dashboard/DashboardIcons";

const drawerWidth = 240;
const ScrollableList = styled(List)(({ theme, open }) => ({
  listStyle: "none",
  margin: 0,
  position: "relative",
  padding: "0px",
  marginRight: "1.50px",
  overflowY: open ? "auto" : "none",
  "&::-webkit-scrollbar": {
    width: 7,
    height: 10,
    marginY: "4px",
    margin: "6px",
    overflowY: "auto",
    border: open ? "1px solid #ccc" : "none",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d5db",
    padding: "2px !important",
    border: open ? "1px solid #0EA5E9" : "none",
    borderRadius: "4px",
    margin: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f8fafc",
    borderRadius: "0.25rem",
    padding: "2px !important",
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashBoard() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);
  const [activeSubMenuChildIndex, setActiveSubMenuChildIndex] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    if (activeMenuIndex === index) {
      setActiveMenuIndex(null);
    } else {
      setActiveMenuIndex(index);
      setActiveSubMenuIndex(null);
    }
  };

  const toggleSubMenu = (index) => {
    if (activeSubMenuIndex === index) {
      setActiveSubMenuIndex(null);
    } else {
      setActiveSubMenuIndex(index);
      setActiveSubMenuChildIndex(null);
    }
  };

  const toggleSubMenuChild = (index) => {
    if (activeSubMenuChildIndex === index) {
      setActiveSubMenuChildIndex(null);
    } else {
      setActiveSubMenuChildIndex(index);
    }
  };

  const handleLogOut = () => {
    navigate("/auth/logout");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} className="font-sans">
      <CssBaseline />
      <AppBar
        className=" bg-white "
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "linear-gradient(to right, #007ca8, #ce2d5f)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <BiSolidHeartCircle />
          </IconButton>
          <AppBar position="fixed" open={open} className="bg-red-500 ">
            <Toolbar>
              <Tooltip title="Open" arrow>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" }),
                  }}
                >
                  <BiSolidHeartCircle />
                </IconButton>
              </Tooltip>
              <AppBar
                position="fixed"
                open={open}
                style={{
                  boxShadow: "none !important",
                  backgroundImage:
                    "linear-gradient(to right, #007ca8 , #ce2d5f)",
                }}
              >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                  <div className="flex items-center">
                    <Tooltip title="Open" arrow placement="right">
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                          marginRight: 5,
                          ...(open && { display: "none" }),
                        }}
                      >
                        <BiSolidHeartCircle />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className="flex items-center">
                    <Typography
                      variant="h6"
                      className="text-white"
                      noWrap
                      component="div"
                    ></Typography>
                    {/* Logout Icon */}
                    <Tooltip title="Logout" arrow>
                      <IconButton color="inherit" onClick={handleLogOut}>
                        <LogOutIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Toolbar>
              </AppBar>
            </Toolbar>
          </AppBar>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/*     Application Logo       */}
          <DocItHealth />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <ScrollableList open={open}>
          <List>
            <ul>
              {Menu.map((menu, index) => (
                <React.Fragment key={index}>
                  <Tooltip
                    title={open ? "" : menu.title}
                    arrow
                    placement="right"
                  >
                    <div>
                      <Link
                        to={menu.path}
                        onClick={() => {
                          toggleMenu(index);
                          !open && handleDrawerOpen();
                        }}
                        component={Link}
                        className={`text-sm flex items-center gap-x-3 cursor-pointer active: rounded-md  ${
                          open
                            ? " ml-3 mr-3 p-2 "
                            : " ml-2   mr-2 pr-10 pt-2 pb-2"
                        } ${
                          activeMenuIndex === index
                            ? "bg-gray-500  bg-opacity-9 transition-transform"
                            : "hover:bg-zinc-200  bg-opacity-10 transition-transform"
                        } active:rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
                      >
                        {" "}
                        <span></span>
                        <span className="text-2xl block float-left">
                          <span
                            className={`text-blue-500 ${
                              open ? "" : "mr-9 pr-9"
                            }`}
                          >
                            {menu.icon ? menu.icon : <RiDashboardFill />}
                          </span>
                        </span>
                        <span
                          className={`text-base font-medium flex-1  duration-2 ${
                            !open && "hidden"
                          }`}
                        >
                          <span
                            className={`${
                              activeMenuIndex === index ? " text-white" : ""
                            } font-sans font-semibold
                      `}
                          >
                            {menu.title}
                          </span>
                        </span>
                        <span className="p-1">
                          {menu.subMenu && open && activeMenuIndex === index ? (
                            <AiOutlineMinusSquare
                              className={`${
                                activeMenuIndex === index ? " text-white " : ""
                              } font-sans text-lg`}
                            />
                          ) : menu.subMenu ? (
                            <AiOutlinePlusSquare
                              className={`${
                                activeMenuIndex === index ? " text-white " : ""
                              } font-sans text-lg`}
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                      {menu.subMenu && activeMenuIndex === index && (
                        <ul>
                          {menu.submenuItems.map((submenuItem, subIndex) => (
                            <React.Fragment key={subIndex}>
                              <Link
                                component={Link}
                                to={submenuItem.path}
                                onClick={() => toggleSubMenu(subIndex)}
                                className={`text-sm   flex  ml-8  font-medium items-center gap-x-4 cursor-pointer pl-7 p-2 pb-2 pt-2 rounded-md mt-2 mr-3  ${
                                  activeSubMenuIndex === subIndex
                                    ? "bg-gray-500  bg-opacity-9 transition-transform"
                                    : "hover:bg-zinc-200  bg-opacity-10 transition-transform"
                                }  ${!open && "hidden"}`}
                              >
                                <span
                                  className={`text-base font-medium flex-1 duration-2  `}
                                >
                                  <span
                                    className={`${
                                      activeSubMenuIndex === subIndex
                                        ? " text-white"
                                        : ""
                                    } font-sans `}
                                  >
                                    {submenuItem.title}
                                  </span>
                                </span>
                                <span className="p-1">
                                  {submenuItem.subMenuChildren &&
                                  open &&
                                  activeMenuIndex === index &&
                                  subIndex === activeSubMenuIndex ? (
                                    <AiOutlineMinusSquare
                                      className={`${
                                        activeSubMenuIndex === subIndex
                                          ? " text-white"
                                          : ""
                                      } text-lg`}
                                    />
                                  ) : submenuItem.subMenuChildren ? (
                                    <AiOutlinePlusSquare
                                      className={`${
                                        activeSubMenuIndex === subIndex
                                          ? " text-white"
                                          : ""
                                      }text-lg`}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </Link>
                              {submenuItem.subMenuChildren &&
                                activeMenuIndex === index &&
                                subIndex === activeSubMenuIndex && (
                                  <ul>
                                    {submenuItem.submenuItemsChildren.map(
                                      (submenuItemChild, childIndex) => (
                                        <React.Fragment key={childIndex}>
                                          <Link
                                            component={Link}
                                            to={submenuItemChild.path}
                                            onClick={() =>
                                              toggleSubMenuChild(childIndex)
                                            }
                                            className={`text-sm ml-12 flex  font-medium items-center gap-x-4 cursor-pointer  pl-4 pr-2 pt-2 pb-2  rounded-md mt-2  mr-3
                                      ${
                                        activeSubMenuChildIndex === childIndex
                                          ? "bg-gray-500  bg-opacity-9 transition-transform"
                                          : "hover:bg-zinc-200  bg-opacity-10 transition-transform"
                                      }  ${!open && "hidden"}`}
                                          >
                                            <span
                                              className={`text-base font-medium flex-1 duration-2  `}
                                            >
                                              <span
                                                className={`${
                                                  activeSubMenuChildIndex ===
                                                  childIndex
                                                    ? " text-white"
                                                    : ""
                                                } font-sans`}
                                              >
                                                {submenuItemChild.title}
                                              </span>
                                            </span>
                                          </Link>
                                        </React.Fragment>
                                      )
                                    )}
                                  </ul>
                                )}
                            </React.Fragment>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Tooltip>
                </React.Fragment>
              ))}
            </ul>
          </List>
        </ScrollableList>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1.5 }}>
        <DrawerHeader />
        <Typography component={"div"} paragraph>
          <Outlet />
        </Typography>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
}
