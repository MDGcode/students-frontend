import HomeworkList from "../components/HomeworkList";

export default function TableViewHomeworkExpress() {
  return (
    <div>
      <HomeworkList urlRoot={import.meta.env.VITE_EXPRESSBACK} />
    </div>
  );
}
