export type PoleClass = {
  day: string;
  time: string;
  type: "Pole Dance" | "Pole Dance Choreography" | "Fitness";
  instructor: string;
};

export type FilterOption = "All" | PoleClass["type"];