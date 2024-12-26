import StudentList from "../components/StudentsList";

export default function TableViewStudents() {
  return (
    <div>
      <StudentList urlRoot={import.meta.env.VITE_EXPRESSBACK} />
    </div>
  );
}
