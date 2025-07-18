import React from "react";
import { Task } from "./PomodoroTaskList";


interface PomodoroTaskItemProps {
  task: Task;
  onSelect: (task: Task) => void;
  onToggleFinish: (task: Task) => void;
  onEdit: (task: Task) => void;
  selected: boolean;
}

export function PomodoroTaskItem({ task, onSelect, onToggleFinish, onEdit, selected }: PomodoroTaskItemProps) {
  return (
    <li
      className={`flex items-center gap-6 rounded px-3 py-2 border transition cursor-pointer ${task.finished ? "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800 opacity-60" : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"} ${selected ? "ring-2 ring-purple-400" : ""}`}
      onClick={() => onSelect(task)}
      aria-selected={selected}
      role="listitem"
    >
      <button
        onClick={e => { e.stopPropagation(); onToggleFinish(task); }}
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${task.finished ? "border-green-400 bg-green-200 dark:bg-green-700" : "border-gray-400 bg-white dark:bg-gray-900 hover:bg-purple-100 dark:hover:bg-purple-900"} transition text-lg`}
        title={task.finished ? "Desmarcar tarefa" : "Concluir tarefa"}
      >
        <i className={`bi ${task.finished ? "bi-arrow-counterclockwise" : "bi-check2"}`}></i>
      </button>
      <span className={`flex-1 text-base font-medium flex items-center ${task.finished ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-gray-100"}`}
        style={{ minHeight: '2.5rem' }}
      >
        {task.description}
      </span>
      <button
        disabled={task.finished}
        onClick={e => {
          e.stopPropagation();
          onEdit(task);
        }}
        className="p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-900 transition disabled:opacity-50 text-lg flex items-center"
        title="Editar tarefa"
      >
        <i className="bi bi-pencil"></i>
      </button>
    </li>
  );
}
