import { useEffect, useState } from "react";
import { Homework } from "../types";

const HomeworkList = ({ urlRoot }: { urlRoot: string }) => {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [newHomework, setNewHomework] = useState({
    subject: "",
    title: "",
    description: "",
  });
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const url = `${urlRoot}/api/homeworks`;

  // Fetch homeworks from the API
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setHomeworks(data))
      .catch((err) => console.error("Error fetching homeworks:", err));
  }, [url]);

  // Add new homework
  const handleAddHomework = async () => {
    if (
      !newHomework.subject ||
      !newHomework.title ||
      !newHomework.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHomework),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setHomeworks([...homeworks, data]);
      setNewHomework({ subject: "", title: "", description: "" });
      alert("Homework added successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to add homework.");
    }
  };

  // Delete homework
  const handleDeleteHomework = async (homeworkId: number) => {
    try {
      const response = await fetch(`${url}/${homeworkId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setHomeworks(homeworks.filter((homework) => homework.id !== homeworkId));
      alert("Homework deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete homework.");
    }
  };

  // Open modal to update homework
  const handleUpdateHomework = (homework: Homework) => {
    setSelectedHomework(homework);
    setIsModalOpen(true);
  };

  // Update homework
  const handleSaveUpdate = async () => {
    if (!selectedHomework) return;

    try {
      const response = await fetch(`${url}/${selectedHomework.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedHomework.subject,
          title: selectedHomework.title,
          description: selectedHomework.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedHomework = await response.json();
      setHomeworks(
        homeworks.map((homework) =>
          homework.id === updatedHomework.id ? updatedHomework : homework
        )
      );
      setIsModalOpen(false);
      alert("Homework updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update homework.");
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHomework(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Homework</h1>

      {/* Homework Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-blue-600">ID</th>
            <th className="py-2 px-4 border-b text-blue-600">Subject</th>
            <th className="py-2 px-4 border-b text-blue-600">Title</th>
            <th className="py-2 px-4 border-b text-blue-600">Description</th>
            <th className="py-2 px-4 border-b text-blue-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {homeworks.map((homework) => (
            <tr key={homework.id} className="hover:bg-blue-50">
              <td className="py-2 px-4 border-b">{homework.id}</td>
              <td className="py-2 px-4 border-b">{homework.subject}</td>
              <td className="py-2 px-4 border-b">{homework.title}</td>
              <td className="py-2 px-4 border-b">{homework.description}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  onClick={() => handleUpdateHomework(homework)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteHomework(homework.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Homework Form */}
      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2 text-blue-600">
          Add New Homework
        </h3>
        <input
          type="text"
          placeholder="Subject"
          value={newHomework.subject}
          onChange={(e) =>
            setNewHomework({ ...newHomework, subject: e.target.value })
          }
          className="border rounded w-full mb-2 p-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={newHomework.title}
          onChange={(e) =>
            setNewHomework({ ...newHomework, title: e.target.value })
          }
          className="border rounded w-full mb-2 p-2"
        />
        <textarea
          placeholder="Description"
          value={newHomework.description}
          onChange={(e) =>
            setNewHomework({ ...newHomework, description: e.target.value })
          }
          className="border rounded w-full mb-2 p-2"
        />
        <button
          onClick={handleAddHomework}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Homework
        </button>
      </div>

      {/* Edit Homework Modal */}
      {isModalOpen && selectedHomework && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Edit Homework
            </h2>

            <input
              type="text"
              value={selectedHomework.subject}
              onChange={(e) =>
                setSelectedHomework({
                  ...selectedHomework,
                  subject: e.target.value,
                })
              }
              className="border rounded w-full mb-2 p-2"
            />
            <input
              type="text"
              value={selectedHomework.title}
              onChange={(e) =>
                setSelectedHomework({
                  ...selectedHomework,
                  title: e.target.value,
                })
              }
              className="border rounded w-full mb-2 p-2"
            />
            <textarea
              value={selectedHomework.description}
              onChange={(e) =>
                setSelectedHomework({
                  ...selectedHomework,
                  description: e.target.value,
                })
              }
              className="border rounded w-full mb-2 p-2"
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleSaveUpdate}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkList;
