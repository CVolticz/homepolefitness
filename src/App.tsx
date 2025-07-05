// App.tsx
import React, { useState } from "react";
import ScheduleGrid from "./components/ScheduleGrid";
import ClassFilter from "./components/ClassFilter";
import type { FilterOption } from "./types";
import Legend from "./components/Legend";
import Footer from "./components/Footer";

function App() {
  const [filter, setFilter] = useState<FilterOption>("All");

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold mb-2">Weekly Class Schedule</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Join our expert-led Pole Dance classes designed for all levels. Find your perfect practice time and enhance your mind-body connection.
        </p>
      </header>

      <ClassFilter activeFilter={filter} setFilter={setFilter} />
      <main className="px-6">
        <ScheduleGrid filter={filter} />
        <Legend />
      </main>
      <Footer />
    </div>
  );
};

export default App;