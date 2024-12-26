import { useEffect, useState } from "react";
import { Student } from "../types";

interface Homework {
  id: number;
  subject: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  StudentHomework: {
    grade: string;
    createdAt: string;
    updatedAt: string;
    StudentId: number;
    HomeworkId: number;
  };
}

const StudentHomeworkList = ({ urlRoot }: { urlRoot: string }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [homeworkOptions, setHomeworkOptions] = useState<Homework[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHomework, setNewHomework] = useState({ homeworkId: "", grade: "" });

  const studentsUrl = `${urlRoot}/api/students`;
  const homeworkOptionsUrl = `${urlRoot}/api/homeworks`;

  // Fetch students from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(studentsUrl);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, [studentsUrl]);

  // Fetch all available homework
  useEffect(() => {
    const fetchHomeworkOptions = async () => {
      try {
        const response = await fetch(homeworkOptionsUrl);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        setHomeworkOptions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHomeworkOptions();
  }, [homeworkOptionsUrl]);

  // Fetch homework for a specific student
  const fetchHomework = async (studentId: number) => {
    try {
      const response = await fetch(`${studentsUrl}/${studentId}/homeworks`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data: Homework[] = await response.json();
      setHomeworkList(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle student row click
  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
    fetchHomework(student.id);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setHomeworkList([]);
    setNewHomework({ homeworkId: "", grade: "" });
  };

  // Handle adding new homework
  const handleAddHomework = async () => {
    if (!selectedStudent || !newHomework.homeworkId || !newHomework.grade) {
      alert("Please select a homework and provide a grade.");
      return;
    }

    try {
      const response = await fetch(
        `${studentsUrl}/${selectedStudent.id}/homeworks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            homeworkId: parseInt(newHomework.homeworkId),
            grade: newHomework.grade,
          }),
        }
      );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      // Refresh the homework list for the student
      fetchHomework(selectedStudent.id);
      alert("Homework added successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to add homework.");
    }
  };

  // Handle deleting homework
  const handleDeleteHomework = async (homeworkId: number) => {
    if (!selectedStudent) return;

    try {
      const response = await fetch(
        `${studentsUrl}/${selectedStudent.id}/homeworks/${homeworkId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      // Refresh the homework list for the student
      fetchHomework(selectedStudent.id);
      alert("Homework deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete homework.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Students</h1>

      {/* Students Table */}
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 border">ID</th>
            <th className="py-3 px-6 border">Name</th>
            <th className="py-3 px-6 border">Email</th>
            <th className="py-3 px-6 border">Specialization</th>
            <th className="py-3 px-6 border">Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              onClick={() => handleRowClick(student)}
              className="cursor-pointer hover:bg-blue-50"
            >
              <td className="py-2 px-6 border">{student.id}</td>
              <td className="py-2 px-6 border">{student.name}</td>
              <td className="py-2 px-6 border">{student.email}</td>
              <td className="py-2 px-6 border">{student.specialization}</td>
              <td className="py-2 px-6 border">{student.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              Homework for {selectedStudent.name}
            </h2>

            <ul className="space-y-4 mb-6">
              {homeworkList.map((homework) => (
                <li key={homework.id} className="border-b pb-4">
                  <h3 className="font-bold text-lg text-blue-600">
                    {homework.title}
                  </h3>
                  <p>Subject: {homework.subject}</p>
                  <p>Description: {homework.description}</p>
                  <p>Grade: {homework.StudentHomework.grade}</p>
                  <button
                    onClick={() => handleDeleteHomework(homework.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 mt-2"
                  >
                    Delete Homework
                  </button>
                </li>
              ))}
              {homeworkList.length === 0 && (
                <p>No homework assigned to this student.</p>
              )}
            </ul>

            {/* Add Homework Form */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg text-blue-600 mb-3">
                Add Homework
              </h3>
              <select
                value={newHomework.homeworkId}
                onChange={(e) =>
                  setNewHomework({ ...newHomework, homeworkId: e.target.value })
                }
                className="border rounded w-full mb-4 p-2"
              >
                <option value="">Select Homework</option>
                {homeworkOptions.map((homework) => (
                  <option key={homework.id} value={homework.id}>
                    {homework.title} ({homework.subject})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Grade"
                value={newHomework.grade}
                onChange={(e) =>
                  setNewHomework({ ...newHomework, grade: e.target.value })
                }
                className="border rounded w-full mb-4 p-2"
              />
              <button
                onClick={handleAddHomework}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
              >
                Add Homework
              </button>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomeworkList;
