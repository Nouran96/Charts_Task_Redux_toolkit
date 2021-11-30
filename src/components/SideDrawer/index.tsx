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
} from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../../assets/images/logo.png";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";

const SideDrawer = () => {
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
      </Drawer>
    </React.Fragment>
  );
};

export default SideDrawer;
