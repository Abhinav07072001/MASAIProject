import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackFormPage from "./pages/FeedbackFormPage";
import SummaryPage from "./pages/SummaryPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackFormPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
