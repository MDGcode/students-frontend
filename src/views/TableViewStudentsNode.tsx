import StudentList from "../components/StudentsList";

export default function TableViewStudentsNode() {
  return (
    <div>
      <StudentList urlRoot={import.meta.env.VITE_NODEBACK} />
    </div>
  );
}
