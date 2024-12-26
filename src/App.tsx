import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import TableViewStudents from "./views/TableViewStudents";
import HomeworkAssign from "./views/HomeworkAssign";
import TableViewHomeworkExpress from "./views/TableViewHomeworkExpress";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/express/table/students" element={<TableViewStudents />} />
        <Route
          path="/express/table/homework"
          element={<TableViewHomeworkExpress />}
        />
        <Route
          path="/express/table/assign-homework"
          element={<HomeworkAssign />}
        />
      </Routes>
    </Router>
  );
}

export default App;
