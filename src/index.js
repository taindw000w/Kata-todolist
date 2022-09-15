import React from "react";
import ReactDOM from "react-dom/client";

import { App }  from "./components/app/app";

const initialTasks = [
  {
    description: "Completed task",
    isDone: true,
    seconds: 0,
    isEditing: false,
  },
  {
    description: "Editing task",
    isDone: false,
    seconds: 0,
    isEditing: true,
  },
  {
    description: "Active task",
    isDone: false,
    seconds: 0,
    isEditing: false,
  },
];

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App initialTasks={initialTasks} />);
