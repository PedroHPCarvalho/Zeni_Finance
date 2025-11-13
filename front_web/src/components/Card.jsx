export function Card({ children }) {
  return (
    <div className="rounded-2xl bg-gray-800 shadow-md">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
