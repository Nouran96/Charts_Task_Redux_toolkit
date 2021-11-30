import React from "react";
import { Route, Routes, Navigate } from "react-router";
import Home from "../containers/Home";
import Monitor from "../containers/Monitor";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/monitor", element: <Monitor /> },
];

const MainRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Redirect back to home for not found paths */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default MainRoutes;
