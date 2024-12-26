import StudentsHomeworkList from "../components/StudentsHomeworkList";

export default function HomeworkAssign() {
  return (
    <div>
      <StudentsHomeworkList urlRoot={import.meta.env.VITE_EXPRESSBACK} />
    </div>
  );
}
