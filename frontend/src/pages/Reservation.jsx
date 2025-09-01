import { useState } from "react";

export default function Reservation() {
  const [activeFloor, setActiveFloor] = useState("1st Floor");

  // Reservation data
  const reservations = [
    { table: "Bar", start: 13, end: 15, name: "John Doe", people: 1, color: "bg-gray-200" },
    { table: "A2", start: 11, end: 12, name: "John Doe", people: 1, color: "bg-gray-200" },
    { table: "B1", start: 11, end: 13, name: "John Doe", people: 1, color: "bg-gray-200" },
    { table: "B3", start: 12, end: 13, name: "John Doe", people: 1, color: "bg-gray-200" },
    { table: "C2", start: 19, end: 20, name: "John Doe", people: 1, color: "bg-gray-200" },
    { table: "A1", start: 17, end: 18, name: "John Doe", people: 1, color: "bg-pink-200" },
    { table: "A2", start: 14, end: 15, name: "John Doe", people: 1, color: "bg-pink-200" },
    { table: "B2", start: 15, end: 16, name: "John Doe", people: 1, color: "bg-pink-200" },
    { table: "C1", start: 16, end: 17, name: "John Doe", people: 1, color: "bg-pink-200" },
  ];

  // Time slots
  const times = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const tables = ["Bar", "A1", "A2", "B1", "B2", "B3", "C1", "C2"];

  return (
    <section className="space-y-6 p-4 sm:p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Reservation</h1>
        <button className="px-4 py-2 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 w-full sm:w-auto">
          Add New Reservation
        </button>
      </div>

      {/* Floor Tabs */}
      <div className="flex space-x-2">
        {["1st Floor", "2nd Floor", "3rd Floor"].map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`px-4 py-2 rounded-xl font-medium ${
              activeFloor === floor ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {floor}
          </button>
        ))}
      </div>

      {/* Reservation Grid */}
      <div className="overflow-x-auto border rounded-xl">
        {/* Time Axis */}
        <div className="grid grid-cols-12 border-b bg-gray-50 text-xs sm:text-sm font-medium text-gray-500">
          <div className="p-2 border-r">Table</div>
          {times.map((t) => (
            <div key={t} className="p-2 border-l text-center">
              {t}:00
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {tables.map((table) => (
          <div key={table} className="grid grid-cols-12 relative h-16 border-b">
            {/* Table label */}
            <div className="p-2 border-r font-medium text-gray-700 bg-gray-50 flex items-center text-xs sm:text-sm">
              {table}
            </div>

            {/* Grid cells */}
            {times.map((t) => (
              <div key={t} className="border-l h-full"></div>
            ))}

            {/* Reservations */}
            {reservations
              .filter((r) => r.table === table)
              .map((r, i) => {
                const startIndex = times.indexOf(r.start);
                const endIndex = times.indexOf(r.end);

                return (
                  <div
                    key={i}
                    className={`${r.color} absolute top-2 bottom-2 rounded-lg shadow flex flex-col justify-center p-2 text-center`}
                    style={{
  left: `${((startIndex + 1) / (times.length + 1)) * 100}%`,
  width: `${((endIndex - startIndex) / (times.length + 1)) * 100}%`,
}}

                  >
                    <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-700">👥 {r.people}</p>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </section>
  );
}
