import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center
        bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
        transition-colors duration-300"
    >
      <div
        className="
        w-full max-w-lg p-6 rounded-lg
        shadow-md dark:shadow-lg
        border border-transparent dark:border-gray-700
        bg-white dark:bg-gray-900
        "
      >
        {children}
      </div>
    </div>
  );
}
