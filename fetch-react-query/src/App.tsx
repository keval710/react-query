import "./App.css";
import CardData from "./components/CardData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import OptimisticUpdate from "./components/OptimisticUpdate";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CardData />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/optimistic" element={<OptimisticUpdate />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
