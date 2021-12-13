import React from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import SettingsIcon from "@mui/icons-material/Settings";
import PublicIcon from "@mui/icons-material/Public";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../types/Redux";
import { toggleTreeDrawerState } from "../../store/reducers/Tree";

const SideDrawer = () => {
  const mobileSize = useMediaQuery("(max-width: 650px)");
  const dispatch = useAppDispatch();
  const location = useLocation();

  const toggleTreeDrawer = () => {
    dispatch(toggleTreeDrawerState());
  };

  return (
    <React.Fragment>
      <Drawer
        classes={{ root: styles.drawer, paper: styles.drawerPaper }}
        variant="permanent"
        anchor="left"
        open={true}
      >
        <Box role="presentation">
          <NavLink to="/">
            <Box display="flex" justifyContent="center" my={2}>
              <img className={styles.logo} src={logo} alt="" />
            </Box>
          </NavLink>
          <List>
            <NavLink
              to="/monitor"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              <Tooltip title="Monitor">
                <ListItem classes={{ root: styles.listItem }}>
                  <ListItemIcon classes={{ root: styles.listItemIcon }}>
                    <MonitorIcon />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </NavLink>
          </List>
        </Box>

        <Box
          flexGrow="1"
          display="flex"
          flexDirection="column"
          justifyContent="end"
        >
          {mobileSize && location.pathname === "/monitor" && (
            <Box sx={{ cursor: "pointer" }} onClick={toggleTreeDrawer}>
              <List>
                <Tooltip title="Toggle tree">
                  <ListItem classes={{ root: styles.listItem }}>
                    <ListItemIcon classes={{ root: styles.listItemIcon }}>
                      <PublicIcon />
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </List>
            </Box>
          )}

          <Box>
            <List>
              <NavLink to="/settings">
                <Tooltip title="Settings">
                  <ListItem classes={{ root: styles.listItem }}>
                    <ListItemIcon classes={{ root: styles.listItemIcon }}>
                      <SettingsIcon />
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </NavLink>
            </List>
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
