import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Subcomponent/layout";
import Overview from "./Subcomponent/overview";
import { NotFound } from "./Subcomponent/NotFound.jsx";

import AnalyticsDashboard from "./anaylatics";

const Homepage = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="audience" element={<div>Audience Content</div>} />
        <Route path="reports" element={<div>Reports Content</div>} />
        <Route path="settings" element={<div>Settings Content</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
export default Homepage;
