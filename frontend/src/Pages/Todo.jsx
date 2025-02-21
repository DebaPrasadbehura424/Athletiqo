// import React, { useState } from "react";
// import { nanoid } from "nanoid";

// function App() {
//   const defaultSections = [
//     { id: nanoid(), name: "Plans", todos: [], isClosed: false },
//     { id: nanoid(), name: "Today", todos: [], isClosed: false },
//     { id: nanoid(), name: "Personal", todos: [], isClosed: false },
//     { id: nanoid(), name: "Important", todos: [], isClosed: false },
//   ];

//   const [sections, setSections] = useState(defaultSections);
//   const [newSection, setNewSection] = useState(""); // For creating a new section
//   const [editing, setEditing] = useState(null); // To track the task being edited
//   const [newTask, setNewTask] = useState(""); // The task input

//   const addTask = (sectionId) => {
//     if (!newTask.trim()) return;
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               todos: [
//                 ...section.todos,
//                 { id: nanoid(), text: newTask, completed: false },
//               ],
//             }
//           : section
//       )
//     );
//     setNewTask("");
//   };

//   const deleteTask = (sectionId, taskId) => {
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               todos: section.todos.filter((task) => task.id !== taskId),
//             }
//           : section
//       )
//     );
//   };

//   const toggleComplete = (sectionId, taskId) => {
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               todos: section.todos.map((task) =>
//                 task.id === taskId
//                   ? { ...task, completed: !task.completed }
//                   : task
//               ),
//             }
//           : section
//       )
//     );
//   };

//   const editTask = (sectionId, taskId, newText) => {
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               todos: section.todos.map((task) =>
//                 task.id === taskId ? { ...task, text: newText } : task
//               ),
//             }
//           : section
//       )
//     );
//     setEditing(null);
//   };

//   const addSection = () => {
//     if (!newSection.trim()) return;
//     const newSectionObj = {
//       id: nanoid(),
//       name: newSection,
//       todos: [],
//       isClosed: false,
//     };
//     setSections((prev) => [...prev, newSectionObj]);
//     setNewSection("");
//   };

//   const toggleSectionVisibility = (sectionId) => {
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? { ...section, isClosed: !section.isClosed } // Toggle visibility
//           : section
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-semibold text-center mb-6">To-Do List</h1>

//         {/* New Section Input */}
//         <div className="mb-4 flex items-center space-x-2">
//           <input
//             type="text"
//             value={newSection}
//             onChange={(e) => setNewSection(e.target.value)}
//             placeholder="New Section Name"
//             className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={addSection}
//             className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           >
//             Add Section
//           </button>
//         </div>

//         {/* Render Each Section */}
//         {sections.map((section) => (
//           <div
//             key={section.id}
//             className="bg-white p-4 mb-6 rounded-xl shadow-md"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-semibold">{section.name}</h2>
//               <div className="space-x-2">
//                 <button
//                   onClick={() => toggleSectionVisibility(section.id)}
//                   className="text-gray-500 hover:underline"
//                 >
//                   {section.isClosed ? "Open" : "Close"} Tasks
//                 </button>
//                 <button
//                   onClick={() => setEditing(section.id)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   Add Task
//                 </button>
//               </div>
//             </div>

//             {/* Input box for new tasks */}
//             {editing === section.id && (
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   value={newTask}
//                   onChange={(e) => setNewTask(e.target.value)}
//                   placeholder="New task..."
//                   className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="flex space-x-4 mt-2">
//                   <button
//                     onClick={() => addTask(section.id)}
//                     className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                   >
//                     Add
//                   </button>
//                   <button
//                     onClick={() => setEditing(null)}
//                     className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Todo List (only visible if not closed) */}
//             {!section.isClosed && section.todos.length > 0 && (
//               <div>
//                 {section.todos.map((task) => (
//                   <div
//                     key={task.id}
//                     className={`flex justify-between items-center p-3 rounded-lg mb-3 ${
//                       task.completed ? "bg-green-100" : "bg-gray-50"
//                     }`}
//                   >
//                     <div>
//                       <input
//                         type="checkbox"
//                         checked={task.completed}
//                         onChange={() => toggleComplete(section.id, task.id)}
//                         className="mr-2"
//                       />
//                       {task.text}
//                     </div>
//                     <div className="space-x-2">
//                       <button
//                         onClick={() =>
//                           editTask(
//                             section.id,
//                             task.id,
//                             prompt("Edit task:", task.text)
//                           )
//                         }
//                         className="text-blue-500 hover:underline"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => deleteTask(section.id, task.id)}
//                         className="text-red-500 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
