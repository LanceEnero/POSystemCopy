export default function Navbar() {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white shadow-sm sm:left-64">
      <div className="flex h-20 flex-col justify-center gap-1 px-6 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-800">
            Procurement
          </h2>

          <p className="text-xs text-gray-500">
            Quantity Solution INC
          </p>
        </div>

        <p className="text-xs text-gray-600 md:text-sm">
          <span className="font-semibold text-gray-900">
            Date:
          </span>{" "}
          {formattedDate}
        </p>
      </div>
    </header>
  );
}