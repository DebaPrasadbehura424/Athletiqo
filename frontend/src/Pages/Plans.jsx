import React, { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import shopping from "../images/work-order.png";
import trash from "../images/bin.gif";
import list from "../images/list.gif";

function Plans() {
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [editing, setEditing] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/plans/${userId}/getAll`)
      .then((response) => {
        if (response.status === 200 && response.data[0].sections) {
          setSections(response.data[0].sections);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [userId, setSections]);

  // Add a new task
  const addTask = async (sectionId) => {
    if (!newTask.trim()) return;

    const newTaskObject = {
      task: newTask,
      completed: false,
      dueDate: null,
    };

    setSections((prev) =>
      prev.map((section) =>
        section._id === sectionId
          ? {
              ...section,
              tasks: [...section.tasks, newTaskObject],
            }
          : section
      )
    );

    try {
      const response = await axios.post(
        `http://localhost:5000/plans/${userId}/section/${sectionId}/task`,
        { task: newTask }
      );

      if (response.status === 201) {
        setSections((prev) =>
          prev.map((section) =>
            section._id === sectionId
              ? {
                  ...section,
                  tasks: section.tasks.map((task) =>
                    task.task === newTaskObject.task
                      ? { ...task, _id: response.data._id }
                      : task
                  ),
                }
              : section
          )
        );
      }
    } catch (err) {
      console.error("Error adding task:", err);
      setSections((prev) =>
        prev.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                tasks: section.tasks.filter(
                  (task) => task.task !== newTaskObject.task
                ),
              }
            : section
        )
      );
    } finally {
      setNewTask("");
    }
  };

  // Delete a task
  const deleteTask = async (sectionId, taskId) => {
    // try {
    //   await axios.delete(
    //     `http://localhost:5000/plans/${userId}/delete/${sectionId}/sectionId/${taskId}/taskId`
    //   );
    //   setSections((prev) =>
    //     prev.map((section) =>
    //       section._id === sectionId
    //         ? {
    //             ...section,
    //             tasks: section.tasks.filter((task) => task._id !== taskId),
    //           }
    //         : section
    //     )
    //   );
    // } catch (err) {
    //   console.error("Error deleting task:", err);
    // }
  };

  // Delete a section
  const deleteSection = async (sectionId) => {
    try {
      await axios.delete(
        `http://localhost:5000/plans/${userId}/delete/${sectionId}/sectionId`
      );

      setSections((prev) =>
        prev.filter((section) => section._id !== sectionId)
      );
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  const addSection = async () => {
    if (!newSection.trim()) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/plans/67b9e23e5277da3e7cc19f30/section",
        { title: newSection }
      );

      if (response.status === 201) {
        setSections((prevSections) => [...prevSections, response.data]);
      }
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setNewSection("");
    }
  };

  const editTask = (sectionId, taskId, updatedTask) => {
    setSections((prev) =>
      prev.map((section) =>
        section._id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task._id === taskId ? { ...task, task: updatedTask } : task
              ),
            }
          : section
      )
    );
  };

  const toggleSectionVisibility = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section._id === sectionId
          ? { ...section, isClosed: !section.isClosed }
          : section
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6">My Plans</h1>

        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="New Section Name"
            className="p-2 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addSection}
            className="py-2 px-5 bg-green-500 text-white rounded-lg cursor-pointer"
          >
            <p>Add </p>
          </button>
        </div>

        {sections.length <= 0 ? (
          <div>
            <img src={shopping} alt="shopping" />
          </div>
        ) : (
          sections.map((section) => (
            <div
              key={section._id}
              className="bg-white p-4 mb-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold flex items-center">
                  <img src={list} alt="list " className="w-15" />
                  {section.title}
                </div>

                <div className="space-x-2 flex items-center">
                  <button
                    onClick={() => toggleSectionVisibility(section._id)}
                    className="text-gray-500 hover:underline"
                  >
                    {section.isClosed ? (
                      <FaArrowUp className="w-6" />
                    ) : (
                      <FaArrowDown className="w-6" />
                    )}
                  </button>
                  <button
                    onClick={() => setEditing(section._id)}
                    className="text-blue-500 hover:underline"
                  >
                    <FaPlus className="w-6 cursor-pointer" />
                  </button>
                  <button
                    onClick={() => deleteSection(section._id)}
                    className="text-blue-500 hover:underline"
                  >
                    <img
                      src={trash}
                      alt="trash"
                      className="w-6 cursor-pointer"
                    />
                  </button>
                </div>
              </div>

              {editing === section._id && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={() => addTask(section._id)}
                      className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {section.isClosed && section.tasks.length > 0 && (
                <div>
                  {section.tasks.map((task) => (
                    <div
                      key={task._id}
                      className={`flex justify-between items-center p-3 rounded-lg mb-3 ${
                        task.completed ? "bg-green-100" : "bg-gray-50"
                      }`}
                    >
                      <div>{task.task}</div>
                      <div className="space-x-2">
                        <button
                          onClick={() =>
                            editTask(
                              section._id,
                              task._id,
                              prompt("Edit task:", task.task)
                            )
                          }
                          className="text-blue-500 hover:underline"
                        >
                          <FaEdit className="w-5" />
                        </button>
                        <button
                          onClick={() => deleteTask(section._id, task._id)}
                          className="text-red-500 "
                        >
                          <FaTrashAlt className="w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Plans;
