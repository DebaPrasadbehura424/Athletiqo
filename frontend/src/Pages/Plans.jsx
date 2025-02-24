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
import list from "../images/list.gif";
import bin from "../images/bin.gif";

function Plans() {
  const cookies = new Cookies();
  const userId = cookies.get("userId");

  // Check for invalid userId and sectionId
  if (!userId) {
    alert("Invalid user, please refresh the page.");
    window.location.reload(); // Refresh the page if userId is not found
  }

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [activeSectionId, setActiveSectionId] = useState(null); // Track which section is active

  useEffect(() => {
    axios
      .get(`http://localhost:5000/plans/${userId}/getAll`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          setSections(response.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [userId]);

  // Add new section
  const addSection = async () => {
    if (!newSection.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/plans/${userId}/section`,
        { title: newSection }
      );

      if (response.status === 201) {
        setSections((prevSections) => [...prevSections, response.data]);
      }
    } catch (error) {
      console.error("Error adding section:", error);
    } finally {
      setNewSection(""); // Clear the input field
    }
  };

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
              tasks: [...section.tasks, { ...newTaskObject, _id: Date.now() }], // Add task locally
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
                    task._id === newTaskObject._id
                      ? { ...task, _id: response.data._id } // Replace with real task id
                      : task
                  ),
                }
              : section
          )
        );
      }
    } catch (err) {
      console.error("Error adding task:", err);
      // Rollback in case of error by filtering based on temporary _id
      setSections((prev) =>
        prev.map((section) =>
          section._id === sectionId
            ? {
                ...section,
                tasks: section.tasks.filter(
                  (task) => task._id !== newTaskObject._id
                ),
              }
            : section
        )
      );
    } finally {
      setNewTask(""); // Clear task input field
    }
  };

  // Toggle task input visibility
  const toggleTaskInputVisibility = (sectionId) => {
    setActiveSectionId((prevActiveSectionId) =>
      prevActiveSectionId === sectionId ? null : sectionId
    );
  };

  // Delete task
  const deleteTask = async (sectionId, taskId) => {
    setSections((prev) =>
      prev.map((section) =>
        section._id === sectionId
          ? {
              ...section,
              tasks: section.tasks.filter((task) => task._id !== taskId),
            }
          : section
      )
    );

    try {
      await axios.delete(
        `http://localhost:5000/plans/${userId}/delete/${sectionId}/sectionId/${taskId}/taskId`
      );
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Delete section
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

  const editTask = async (sectionId, taskId, updatedTask) => {
    await axios.put(
      `http://localhost:5000/plans/${userId}/section/${sectionId}/task/${taskId}`,
      { task: updatedTask }
    );
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
            Add
          </button>
        </div>

        {sections.length <= 0 ? (
          <div>
            <img src={shopping} alt="No plans" />
          </div>
        ) : (
          sections.map((section) => (
            <div
              key={section._id}
              className="bg-white p-4 mb-6 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-semibold flex items-center">
                  <img src={list} alt="List" className="w-8 h-8" />
                  {section.title}
                </div>

                <div className="space-x-2 flex items-center">
                  <button
                    onClick={() => toggleTaskInputVisibility(section._id)}
                    className="text-gray-500 hover:underline"
                  >
                    {activeSectionId === section._id ? (
                      <FaArrowUp className="text-gray-600" />
                    ) : (
                      <FaArrowDown className="text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteSection(section._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>

              {activeSectionId === section._id && (
                <>
                  <div className="flex mb-4 space-x-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="New Task"
                      className="p-2 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <button
                      onClick={() => addTask(section._id)}
                      className="py-2 px-5 bg-blue-500 text-white rounded-lg cursor-pointer"
                    >
                      Add Task
                    </button>
                  </div>

                  {section.tasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex justify-between items-center p-4 mb-4 border border-gray-300 rounded-lg"
                    >
                      <div className="flex space-x-2">
                        <p>{task.task}</p>
                      </div>
                      <div className="space-x-2 flex items-center">
                        <button
                          onClick={() =>
                            editTask(
                              section._id,
                              task._id,
                              prompt("Edit Task:", task.task)
                            )
                          }
                          className="text-yellow-500 hover:text-yellow-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteTask(section._id, task._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          {/* <FaTrashAlt /> */}
                          <img src={bin} alt="bin" className="w-10" />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Plans;
