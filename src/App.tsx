import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import TableViewHomeworkExpress from "./views/TableViewHomeworkExpress";
import TableViewStudentsExpress from "./views/TableViewStudentsExpress";
import TableViewStudentsNode from "./views/TableViewStudentsNode";
import TableViewHomeworkNode from "./views/TableViewHomeworkNode";
import HomeworkAssignExpress from "./views/HomeworkAssignExpress";
import HomeworkAssignNode from "./views/HomeworkAssignNode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/express/table/students"
          element={<TableViewStudentsExpress />}
        />
        <Route
          path="/express/table/homework"
          element={<TableViewHomeworkExpress />}
        />
        <Route
          path="/express/table/assign-homework"
          element={<HomeworkAssignExpress />}
        />
        <Route
          path="/node/table/students"
          element={<TableViewStudentsNode />}
        />
        <Route
          path="/node/table/homework"
          element={<TableViewHomeworkNode />}
        />
        <Route
          path="/node/table/assign-homework"
          element={<HomeworkAssignNode />}
        />
      </Routes>
    </Router>
  );
}

export default App;
