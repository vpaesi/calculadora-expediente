import React, { useState, useRef, useEffect } from "react";

interface PomodoroTaskFormProps {
  edit: boolean;
  initialValue: string;
  onCancel: () => void;
  onDelete: () => void;
  onSave: (desc: string) => void;
}

export function PomodoroTaskForm({ edit, initialValue, onCancel, onDelete, onSave }: PomodoroTaskFormProps) {
  const [desc, setDesc] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  useEffect(() => {
    setDesc(initialValue);
  }, [initialValue]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (desc.trim()) onSave(desc.trim());
  }

  return (
    <form className="w-full bg-gray-900 rounded-2xl shadow-lg p-8 mb-4 border-0" onSubmit={handleSubmit} aria-hidden={false}>
      <div className="mb-6">
        <label className="block text-3xl font-bold text-white font-unbounded mb-4">{edit ? "Editando tarefa" : "Adicionando tarefa"}</label>
        <textarea
          required
          rows={5}
          className="w-full rounded-xl border-2 border-white bg-gray-800 text-white p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-xl shadow-sm placeholder-gray-400"
          placeholder="No que você está trabalhando?"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          ref={textareaRef}
        />
      </div>
      <footer className="flex flex-row items-center justify-between gap-4 mt-6">
        <button
          type="button"
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-transparent text-lg font-bold text-gray-300 hover:bg-gray-800 transition disabled:opacity-60"
          onClick={onDelete}
          disabled={!edit}
        >
          <i className="bi bi-trash"></i> Deletar
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-transparent text-lg font-bold text-gray-300 hover:bg-gray-800 transition"
            onClick={onCancel}
          >
            <i className="bi bi-x"></i> Cancelar
          </button>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white text-lg font-bold text-white bg-black/30 hover:bg-purple-900/40 transition shadow"
          >
            <i className="bi bi-save"></i> Salvar
          </button>
        </div>
      </footer>
    </form>
  );
}
