const legends = [
  {
    type: "Intermdiate Pole",
    color: "bg-blue-100",
    desc: "Traditional approach focusing on basic postures and breathing techniques."
  },
  {
    type: "Beginner Pole",
    color: "bg-yellow-100",
    desc: "Perfect introduction to yoga with fundamental poses and gentle movements."
  },
  {
    type: "Fitness",
    color: "bg-purple-100",
    desc: "Guided sessions for mental clarity, stress relief, and inner peace."
  }
];

function Legend() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-12">
      {legends.map((legend) => (
      <div key={legend.type} className={`rounded-xl p-4 shadow-sm ${legend.color}`}>
        <div className="font-bold mb-1">{legend.type}</div>
        <p className="text-sm text-gray-600">{legend.desc}</p>
      </div>))
      }
    </section>
  );
}

export default Legend;