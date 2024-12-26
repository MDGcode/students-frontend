import StudentsHomeworkList from "../components/StudentsHomeworkList";

export default function HomeworkAssignNode() {
  return (
    <div>
      <StudentsHomeworkList urlRoot={import.meta.env.VITE_NODEBACK} />
    </div>
  );
}
