export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg w-full ${className}`}
    >
      {children}
    </button>
  );
}
