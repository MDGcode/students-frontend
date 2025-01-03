import { useEffect, useState } from "react";
import { Student } from "../types";

const StudentList = ({ urlRoot }: { urlRoot: string }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    specialization: "",
    year: "",
  });
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [editingStudentData, setEditingStudentData] = useState<
    Partial<Student>
  >({});
  const url = `${urlRoot}/api/students`;

  // Fetch students from the API
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, [url]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Add new student
  const handleAddStudent = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error(`Failed to add student: ${response.statusText}`);
      }

      const createdStudent = await response.json();
      setStudents((prev) => [...prev, createdStudent]); // Update students list
      setNewStudent({ name: "", email: "", specialization: "", year: "" }); // Reset form
    } catch (error) {
      console.error(error);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id: number) => {
    try {
      const deleteUrl = `${url}/${id}`;
      const response = await fetch(deleteUrl, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Failed to delete student: ${response.statusText}`);
      }

      setStudents((prev) => prev.filter((student) => student.id !== id)); // Remove student from state
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing a student
  const handleEditStudent = (student: Student) => {
    setEditingStudentId(student.id);
    setEditingStudentData(student);
  };

  // Handle input changes while editing
  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes to the student
  const handleSaveStudent = async () => {
    if (!editingStudentId || !editingStudentData) return;

    try {
      const patchUrl = `${url}/${editingStudentId}`;
      const response = await fetch(patchUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStudentData),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit student: ${response.statusText}`);
      }

      const updatedStudent = await response.json();
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudentId ? updatedStudent : student
        )
      ); // Update students list
      setEditingStudentId(null); // Exit edit mode
      setEditingStudentData({});
    } catch (error) {
      console.error(error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setEditingStudentData({});
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg ">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Students</h1>

      {/* Add Student Form */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg  bg-gray-50">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Add New Student
        </h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            name="specialization"
            value={newStudent.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="number"
            name="year"
            value={newStudent.year}
            onChange={handleChange}
            placeholder="Year"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <table className="min-w-full bg-white  rounded-lg">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border text-blue-700">ID</th>
            <th className="py-2 px-4 border text-blue-700">Name</th>
            <th className="py-2 px-4 border text-blue-700">Email</th>
            <th className="py-2 px-4 border text-blue-700">Specialization</th>
            <th className="py-2 px-4 border text-blue-700">Year</th>
            <th className="py-2 px-4 border text-blue-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-blue-50 transition">
              {editingStudentId === student.id ? (
                <>
                  <td className="py-2 px-4 border">{student.id}</td>
                  <td className="py-2 px-4 border">
                    <input
                      type="text"
                      name="name"
                      value={editingStudentData.name || ""}
                      onChange={handleEditingChange}
                      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <input
                      type="email"
                      name="email"
                      value={editingStudentData.email || ""}
                      onChange={handleEditingChange}
                      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <input
                      type="text"
                      name="specialization"
                      value={editingStudentData.specialization || ""}
                      onChange={handleEditingChange}
                      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      name="year"
                      value={editingStudentData.year || ""}
                      onChange={handleEditingChange}
                      className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={handleSaveStudent}
                      className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white py-1 px-2 rounded-md hover:bg-gray-600 ml-2"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border">{student.id}</td>
                  <td className="py-2 px-4 border">{student.name}</td>
                  <td className="py-2 px-4 border">{student.email}</td>
                  <td className="py-2 px-4 border">{student.specialization}</td>
                  <td className="py-2 px-4 border">{student.year}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-2 px-4 border text-center text-gray-500"
              >
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
