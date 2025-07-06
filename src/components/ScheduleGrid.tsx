/**
 * ScheduleGrid component to display pole fitness classes in a grid format (filterable by class type)
 * ScheduleGrid also handle user registration according to selected class card
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassCard from "./ClassCard";
import type { FilterOption } from "../types";
import type { PoleClass } from "../types";

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  filter: FilterOption;
};

function ScheduleGrid({ filter }: Props) {
  // enable pagination and navigation
  const navigate = useNavigate();

  // State to hold the schedule data and times
  const [schedule, setSchedule] = useState<PoleClass[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const fetchSchedule = () => {
      fetch(SHEET_URL)
        .then((res) => res.text())
        .then((csv) => {
          
          // Parse CSV data
          const lines = csv.split("\n").slice(1); // skip header
          const parsed: PoleClass[] = [];
          const timeSet = new Set<string>();

          lines.forEach((line) => {
            const [day, startTime, endTime, type, instructor] = line.split(",");
            if (day && startTime && endTime && type && instructor) {
              parsed.push({
                day: day.trim(),
                startTime: startTime.trim(),
                endTime: endTime.trim(),
                type: type.trim() as PoleClass["type"],
                instructor: instructor.trim()
              });
              timeSet.add(startTime.trim());
            }
          })
          setSchedule(parsed);

          // Convert to 24-hour format if needed
          const convertTo24Hr = (time: string) => {
            const [hour, minute] = time.split(":");
            const isPM = time.toLowerCase().includes("pm");
            let newHour = parseInt(hour, 10);
            if (isPM && newHour < 12) newHour += 12; //
            if (!isPM && newHour === 12) newHour = 0; // Convert 12 AM to 0
            return `${newHour.toString().padStart(2, "0")}:${minute}`;
          };

          const sortedTimes = Array.from(timeSet).sort((a, b) => {
            // Sort by time in 24-hour format
            // This assumes times are in HH:MM format, e.g., "10:00 AM", "2:30 PM"
            // Adjust the regex if your time format is different
            // Example: "10:00 AM" -> "10:00", "2:30 PM" -> "14:30" 
            const t1 = convertTo24Hr(a);
            const t2 = convertTo24Hr(b);
            return t1.localeCompare(t2);
          });

          setTimes(sortedTimes);
        })
        .catch((err) => console.error("Failed to load schedule", err));
    } 
    fetchSchedule(); // initial fetch

    // Set up interval to refresh schedule every 5 minutes
    // This is useful if the schedule can change frequently
    // Adjust the interval as needed
    const intervalId = setInterval(fetchSchedule, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  const filteredSchedule =
    filter === "All" ? schedule : schedule.filter((c) => c.type === filter);

  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white p-4">
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-24"></th>
            {days.map((day) => (
              <th key={day} className="p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="text-sm font-medium p-2 border">{time}</td>
              {days.map((day) => {
                const poleClass = filteredSchedule.find(
                  (s) => s.day === day && s.startTime === time
                );
                return (
                  <td key={day + time} className="border p-2 align-top h-24">
                    {poleClass && (
                      <ClassCard
                        poleClass={poleClass}
                        onClick={() => {
                          // Handle registration logic here, navigate the user to the registration page
                          navigate(`/register?day=${encodeURIComponent(poleClass.day)}&start=${encodeURIComponent(poleClass.startTime)}&end=${encodeURIComponent(poleClass.endTime)}&type=${encodeURIComponent(poleClass.type)}&instructor=${encodeURIComponent(poleClass.instructor)}`);
                        }}
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleGrid;