import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";
import NodeDetails from "../components/NodeDetails";
import styles from "./styles.module.css";
import TempChart from "../components/TempChart";
import WorldTree from "../components/WorldTree";
import { useAppDispatch, useAppSelector } from "../types/Redux";
import { toggleTreeDrawerState } from "../store/reducers/Tree";

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper(children: JSX.Element): JSX.Element;
  children: JSX.Element;
}) =>
  condition ? (
    wrapper(children)
  ) : (
    <Box className={styles.firstColumnContainer}>{children}</Box>
  );

const Monitor = () => {
  const { pathname } = useLocation();
  const mobileSize = useMediaQuery("(max-width:650px)");
  const { treeDrawerOpened } = useAppSelector((state) => state.tree);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const title = pathname.split("/").join("");
    setTitle(title ? title.slice(0, 1).toUpperCase() + title.slice(1) : title);
  }, [pathname]);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    dispatch(toggleTreeDrawerState());
  };

  return (
    <Box className={styles.monitorContainer}>
      <ConditionalWrapper
        condition={mobileSize}
        wrapper={(children: JSX.Element) => (
          <Drawer
            classes={{
              paper: styles.treeDrawerPaper,
            }}
            anchor="left"
            open={treeDrawerOpened}
            onClose={toggleDrawer}
          >
            {children}
          </Drawer>
        )}
      >
        <WorldTree />
      </ConditionalWrapper>

      <Box className={styles.secondColumnContainer}>
        <CustomAppBar title={title} />

        <NodeDetails />
      </Box>

      <Box className={styles.thirdColumnContainer}>
        <TempChart />
      </Box>
    </Box>
  );
};

export default Monitor;
