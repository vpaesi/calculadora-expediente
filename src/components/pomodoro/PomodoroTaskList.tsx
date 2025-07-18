import { useState, useEffect, useRef } from "react";
import { PomodoroTaskForm } from "./PomodoroTaskForm";
import { PomodoroTaskItem } from "./PomodoroTaskItem";

export interface Task {
  description: string;
  finished: boolean;
  id: string;
}

export function PomodoroTaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showMenu) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        dotsRef.current &&
        !dotsRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  useEffect(() => {
    const saved = localStorage.getItem("pomodoro-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("pomodoro-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleSelect(task: Task) {
    if (task.finished) return;
    setSelectedTask(task.id === selectedTask?.id ? null : task);
    setEdit(false);
  }

  function handleAdd(description: string) {
    setTasks([...tasks, { description, finished: false, id: Date.now().toString() }]);
  }

  function handleEdit(description: string) {
    if (selectedTask) {
      setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, description } : t));
      setEdit(false);
      setShowForm(false);
    }
  }

  function handleDeleteSelected() {
    if (selectedTask) {
      setTasks(tasks.filter(t => t.id !== selectedTask.id));
      setSelectedTask(null);
      setEdit(false);
      setShowForm(false);
    }
  }

  function handleDeleteFinished() {
    setTasks(tasks.filter(t => !t.finished));
  }

  function handleDeleteAll() {
    setTasks([]);
    setSelectedTask(null);
    setEdit(false);
    setShowForm(false);
  }

  function handleToggleFinish(task: Task) {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, finished: !t.finished } : t));
    if (selectedTask?.id === task.id) setSelectedTask(null);
  }

  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-md p-6 mb-6 relative">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 relative text-base md:text-lg lg:text-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-unbounded">Lista de tarefas:</h2>
        <div className="relative flex items-center">
          <button
            ref={dotsRef}
            className="ml-2 p-2 rounded-full border-2 border-purple-500 text-2xl text-purple-400 hover:bg-purple-900/20 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => setShowMenu((v) => !v)}
            aria-label="Abrir menu de tarefas"
          >
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 z-20 w-64 bg-gray-800 border-2 border-blue-400 rounded-xl shadow-lg py-4 flex flex-col gap-2 animate-fade-in"
              style={{ top: '2.5rem' }}
            >
              <button
                onClick={() => { handleDeleteFinished(); setShowMenu(false); }}
                className="flex items-center gap-3 px-6 py-3 text-lg text-white hover:bg-gray-700 transition text-left"
              >
                <i className="bi bi-check-lg text-2xl"></i>
                Limpar tarefas concluídas
              </button>
              <button
                onClick={() => { handleDeleteAll(); setShowMenu(false); }}
                className="flex items-center gap-3 px-6 py-3 text-lg text-white hover:bg-gray-700 transition text-left"
              >
                <i className="bi bi-trash text-2xl"></i>
                Limpar todas as tarefas
              </button>
            </div>
          )}
        </div>
      </header>
      <ul className="space-y-2 mb-4 text-base md:text-lg">
        {tasks.map((task) => (
          <PomodoroTaskItem
            key={task.id}
            task={task}
            onSelect={handleSelect}
            onToggleFinish={handleToggleFinish}
            onEdit={(t) => {
              setSelectedTask(t);
              setEdit(true);
              setShowForm(true);
            }}
            selected={selectedTask?.id === task.id}
          />
        ))}
      </ul>
      {showForm && (
        <PomodoroTaskForm
          edit={edit}
          initialValue={edit && selectedTask ? selectedTask.description : ""}
          onCancel={() => { setShowForm(false); setEdit(false); }}
          onDelete={handleDeleteSelected}
          onSave={(desc: string) => {
            if (edit) handleEdit(desc);
            else handleAdd(desc);
            setShowForm(false);
          }}
        />
      )}
      <button
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 border-purple-500 text-purple-400 font-bold text-xl bg-transparent hover:bg-purple-900/20 transition mt-4"
        onClick={() => { setShowForm(true); setEdit(false); }}
      >
        <i className="bi bi-plus-circle"></i> Adicionar nova tarefa
      </button>
    </div>
  );
}
