import type { PoleClass } from "../types";

const colorMap: Record<PoleClass["type"], string> = {
  "Pole Dance": "bg-blue-100 text-blue-800",
  "Pole Dance Choreography": "bg-yellow-100 text-yellow-800",
  "Fitness": "bg-purple-100 text-purple-800",
};

type Props = {
  poleClass: PoleClass;
  onClick?: () => void;
};


function ClassCard({ poleClass, onClick }: Props) {
  return (
    <div
      className={`rounded-lg p-3 text-sm shadow-sm transition cursor-pointer hover:shadow-md hover:scale-[1.02] ${colorMap[poleClass.type]}`}
      onClick={onClick}
    >
        <div className="font-semibold">{poleClass.type}</div>
        <div className="text-xs text-gray-600 mb-1">{poleClass.startTime} - {poleClass.endTime}</div> {/* Time at top */}
        <div className="text-xs">{poleClass.instructor}</div>
    </div>
  );
};

export default ClassCard;
