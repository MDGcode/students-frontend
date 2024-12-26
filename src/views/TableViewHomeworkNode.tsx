import HomeworkList from "../components/HomeworkList";

export default function TableViewHomeworkNode() {
  return (
    <div>
      <HomeworkList urlRoot={import.meta.env.VITE_NODEBACK} />
    </div>
  );
}
