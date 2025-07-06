// App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScheduleGrid from "./components/ScheduleGrid";
import ClassFilter from "./components/ClassFilter";
import RegisterPage from "./components/RegisterPage";
import type { FilterOption } from "./types";
import Legend from "./components/Legend";
import Footer from "./components/Footer";

function HomePage() {
  const [filter, setFilter] = useState<FilterOption>("All");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold mb-2">Weekly Class Schedule</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Join our expert-led Pole Dance classes designed for all levels. Find your perfect practice time and enhance your mind-body connection.
        </p>
        <a
          href="https://homepolenfitness.shop/"
          className="inline-block mt-4 px-5 py-2 bg-white text-black rounded-full hover:bg-blue-600 transition"
        >
          Home
        </a>
      </header>
      <ClassFilter activeFilter={filter} setFilter={setFilter} />
      <main className="px-6">
        <ScheduleGrid filter={filter} />
        <Legend />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
