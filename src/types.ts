export type PoleClass = {
  day: string;
  startTime: string;
  endTime: string;
  type: "All" | "Pole Dance" | "Pole Dance Choreography" | "Fitness";
  instructor: string;
};

export type FilterOption = "All" | PoleClass["type"];