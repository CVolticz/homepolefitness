from zipfile import ZipFile
import os

# Define project file structure and content
project_files = {
    "src/App.tsx": """import React, { useState } from "react";
import ScheduleGrid from "./components/ScheduleGrid";
import ClassFilter from "./components/ClassFilter";
import { FilterOption } from "./types";
import Legend from "./components/Legend";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterOption>("All");

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold mb-2">Weekly Class Schedule</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Join our expert-led yoga classes designed for all levels. Find your perfect practice time and enhance your mind-body connection.
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
""",
    "src/components/ClassFilter.tsx": """import React from "react";
import { FilterOption } from "../types";

type Props = {
  activeFilter: FilterOption;
  setFilter: (filter: FilterOption) => void;
};

const filterOptions: FilterOption[] = [
  "All",
  "Vinyasa Flow",
  "Hatha Yoga",
  "Beginner Yoga",
  "Meditation"
];

const ClassFilter: React.FC<Props> = ({ activeFilter, setFilter }) => {
  return (
    <div className="flex justify-center gap-3 flex-wrap mb-8">
      {filterOptions.map(option => (
        <button
          key={option}
          onClick={() => setFilter(option)}
          className={\`px-4 py-2 rounded-full border transition \${activeFilter === option
            ? "bg-amber-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"}\`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ClassFilter;
""",
    "src/components/ScheduleGrid.tsx": """import React from "react";
import { schedule } from "../data/scheduleData";
import ClassCard from "./ClassCard";
import { FilterOption } from "../types";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["7:00 AM", "9:00 AM", "5:00 PM", "7:00 PM"];

type Props = {
  filter: FilterOption;
};

const ScheduleGrid: React.FC<Props> = ({ filter }) => {
  const filteredSchedule = filter === "All"
    ? schedule
    : schedule.filter(c => c.type === filter);

  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white p-4">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-24"></th>
            {days.map(day => (
              <th key={day} className="p-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(time => (
            <tr key={time}>
              <td className="text-sm font-medium p-2 border">{time}</td>
              {days.map(day => {
                const yogaClass = filteredSchedule.find(
                  s => s.day === day && s.time === time
                );
                return (
                  <td key={day + time} className="border p-2 align-top h-24">
                    {yogaClass && <ClassCard yogaClass={yogaClass} />}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleGrid;
""",
    "src/components/ClassCard.tsx": """import React from "react";
import { YogaClass } from "../types";

const colorMap: Record<YogaClass["type"], string> = {
  "Vinyasa Flow": "bg-green-100 text-green-800",
  "Hatha Yoga": "bg-blue-100 text-blue-800",
  "Beginner Yoga": "bg-yellow-100 text-yellow-800",
  "Meditation": "bg-purple-100 text-purple-800",
};

type Props = {
  yogaClass: YogaClass;
};

const ClassCard: React.FC<Props> = ({ yogaClass }) => {
  return (
    <div className={\`rounded-lg p-3 text-sm shadow-sm \${colorMap[yogaClass.type]}\`}>
      <div className="font-semibold">{yogaClass.type}</div>
      <div className="text-xs">{yogaClass.instructor}</div>
    </div>
  );
};

export default ClassCard;
""",
    "src/components/Legend.tsx": """import React from "react";

const legends = [
  {
    type: "Vinyasa Flow",
    color: "bg-green-100",
    desc: "Dynamic sequence of poses synchronized with breath, building strength and flexibility."
  },
  {
    type: "Hatha Yoga",
    color: "bg-blue-100",
    desc: "Traditional approach focusing on basic postures and breathing techniques."
  },
  {
    type: "Beginner Yoga",
    color: "bg-yellow-100",
    desc: "Perfect introduction to yoga with fundamental poses and gentle movements."
  },
  {
    type: "Meditation",
    color: "bg-purple-100",
    desc: "Guided sessions for mental clarity, stress relief, and inner peace."
  }
];

const Legend: React.FC = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-12">
    {legends.map((legend) => (
      <div key={legend.type} className={\`rounded-xl p-4 shadow-sm \${legend.color}\`}>
        <div className="font-bold mb-1">{legend.type}</div>
        <p className="text-sm text-gray-600">{legend.desc}</p>
      </div>
    ))}
  </section>
);

export default Legend;
""",
    "src/components/Footer.tsx": """import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-10 mt-20">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
      <div>
        <h3 className="font-bold text-lg mb-2">Santosha</h3>
        <p className="text-sm">
          Find your balance and inner peace through mindful practice and expert guidance.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>About</li>
          <li>Yoga essentials</li>
          <li>Schedule</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Classes</h4>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>Hatha Yoga</li>
          <li>Vinyasa Flow</li>
          <li>Beginner Yoga</li>
          <li>Meditation</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Connect</h4>
        <div className="flex space-x-3">
          <a href="#"><span className="sr-only">Instagram</span>📷</a>
          <a href="#"><span className="sr-only">Email</span>✉️</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
""",
    "src/data/scheduleData.ts": """import { YogaClass } from "../types";

export const schedule: YogaClass[] = [
  { day: "Mon", time: "7:00 AM", type: "Meditation", instructor: "John D." },
  { day: "Tue", time: "7:00 AM", type: "Hatha Yoga", instructor: "Maya R." },
  { day: "Wed", time: "7:00 AM", type: "Beginner Yoga", instructor: "Lisa P." },
  { day: "Wed", time: "9:00 AM", type: "Vinyasa Flow", instructor: "Sarah M." },
  { day: "Thu", time: "7:00 AM", type: "Meditation", instructor: "John D." },
  { day: "Fri", time: "7:00 AM", type: "Hatha Yoga", instructor: "Maya R." },
  { day: "Fri", time: "9:00 AM", type: "Vinyasa Flow", instructor: "Sarah M." },
  { day: "Sat", time: "7:00 AM", type: "Hatha Yoga", instructor: "Maya R." },
  { day: "Sun", time: "7:00 AM", type: "Beginner Yoga", instructor: "Lisa P." },
  { day: "Mon", time: "9:00 AM", type: "Beginner Yoga", instructor: "Lisa P." },
  { day: "Tue", time: "9:00 AM", type: "Hatha Yoga", instructor: "Maya R." },
  { day: "Wed", time: "5:00 PM", type: "Vinyasa Flow", instructor: "Sarah M." },
  { day: "Thu", time: "9:00 AM", type: "Hatha Yoga", instructor: "Maya R." },
  { day: "Fri", time: "7:00 PM", type: "Meditation", instructor: "John D." },
  { day: "Sat", time: "9:00 AM", type: "Beginner Yoga", instructor: "Lisa P." },
  { day: "Sun", time: "7:00 PM", type: "Meditation", instructor: "John D." }
];
""",
    "src/types.ts": """export type YogaClass = {
  day: string;
  time: string;
  type: "Vinyasa Flow" | "Hatha Yoga" | "Beginner Yoga" | "Meditation";
  instructor: string;
};

export type FilterOption = "All" | YogaClass["type"];
"""
}

# Create ZIP
zip_path = "/mnt/data/yoga-schedule-tsx.zip"
with ZipFile(zip_path, "w") as zipf:
    for file_path, content in project_files.items():
        full_path = os.path.join("/tmp", file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w") as f:
            f.write(content)
        zipf.write(full_path, arcname=file_path)

zip_path
