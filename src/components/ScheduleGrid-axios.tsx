// import { useEffect, useState } from "react";
// import axios from "axios";
// import ClassCard from "./ClassCard";
// import type { FilterOption } from "../types";
// import type { PoleClass } from "../types";


// const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


// type Props = {
//   filter: FilterOption;
// };

// function ScheduleGrid({ filter }: Props) {

//   const [schedule, setSchedule] = useState<PoleClass[]>([]);
//   const [times, setTimes] = useState<string[]>([]);

//   useEffect(() => {
//     axios.get(SHEET_URL)
//       .then((response) => {
//         const parsedCsvData = parseCSV(response.data);
//         setSchedule(parsedCsvData);

//         // Extract unique sorted times
//         const timeSet = new Set(parsedCsvData.map((item) => item.time));
//         const sortedTimes = Array.from(timeSet).sort((a, b) => {
//           const parseTime = (t: string) => new Date(`1970-01-01T${convertTo24Hr(t)}`);
//           return parseTime(a).getTime() - parseTime(b).getTime();
//         });

//         setTimes(sortedTimes);
//       })
//       .catch((error) => {
//         console.error("Error fetching CSV data:", error);
//       });
//   }, []);

//   /**
//    * Parse CSV text into an array of YogaClass objects.
//    */
//   function parseCSV(csvText: string): PoleClass[] {
//     const rows = csvText.trim().split(/\r?\n/);
//     const data: PoleClass[] = [];

//     for (let i = 1; i < rows.length; i++) {
//       const row = rows[i].split(",");
//       if (row.length < 4) continue;

//       const [day, time, type, instructor] = row.map((cell) => cell.trim());

//       data.push({
//         day,
//         time,
//         type: type as PoleClass["type"],
//         instructor,
//       });
//     }
//     return data;
//   }

//   /**
//    * Converts 12-hour time like "7:00 AM" to "07:00" for sorting.
//    */
//   function convertTo24Hr(timeStr: string): string {
//     const [time, modifier] = timeStr.split(" ");
//     let [hours, minutes] = time.split(":").map(Number);

//     if (modifier === "PM" && hours < 12) hours += 12;
//     if (modifier === "AM" && hours === 12) hours = 0;

//     return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
//   }

//   const filteredSchedule =
//     filter === "All" ? schedule : schedule.filter((c) => c.type === filter);

//   return (
//     <div className="overflow-x-auto rounded-xl shadow bg-white p-4">
//       <table className="w-full table-fixed border-collapse">
//         <thead>
//           <tr>
//             <th className="w-24"></th>
//             {days.map((day) => (
//               <th key={day} className="p-2">
//                 {day}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {times.map((time) => (
//             <tr key={time}>
//               <td className="text-sm font-medium p-2 border">{time}</td>
//               {days.map((day) => {
//                 const poleClass = filteredSchedule.find(
//                   (s) => s.day === day && s.time === time
//                 );
//                 return (
//                   <td key={day + time} className="border p-2 align-top h-24">
//                     {poleClass && <ClassCard poleClass={poleClass} />}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ScheduleGrid;