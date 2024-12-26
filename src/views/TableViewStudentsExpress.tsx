import StudentList from "../components/StudentsList";

export default function TableViewStudentsExpress() {
  return (
    <div>
      <StudentList urlRoot={import.meta.env.VITE_EXPRESSBACK} />
    </div>
  );
}
