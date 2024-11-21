"use client";

import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiTrash2, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    if (tasks.length > 0 && tasks.every((task) => task.completed)) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-gray-800"
      style={{
        background:
          "linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1, #fad0c4)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Keyframes for Gradient Animation */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Header */}
      <header className="w-full py-8 shadow-lg">
        <h1 className="text-5xl font-bold text-center text-white">
          My <span className="text-yellow-300"> ToDo</span> App
        </h1>
      </header>

      {/* Main Container */}
      <motion.div
        className="mt-10 w-full max-w-4xl px-6 py-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Progress Bar */}
        <div className="mb-8 bg-gray-200 rounded-full h-4 shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedTasks / totalTasks) * 100 || 0}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>

        {/* Task Input */}
        <div className="flex items-center gap-4 mb-8">
          <motion.input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-4 bg-white border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            onClick={addTask}
            className="p-4 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-lg shadow hover:shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus size={20} />
          </motion.button>
        </div>

        {/* Task List */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          layout
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.li
                key={task.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg"
              >
                <motion.button
                  onClick={() => toggleComplete(task.id)}
                  className={`p-2 mr-4 rounded-full ${
                    task.completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiCheckCircle size={20} />
                </motion.button>
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
                <motion.button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTrash2 size={20} />
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </motion.div>

      {/* Popup */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-teal-500 mb-4">
              🎉 All Tasks Completed! 🎉
            </h2>
            <p>Great job! Keep up the productivity!</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TodoApp;
