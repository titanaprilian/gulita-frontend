const features = [
  {
    title: "Instant AI Analysis",
    description: "Get your diabetes risk result in seconds, powered by advanced machine learning.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1V8h-1m-4 0h1v4h1m-4 0h1v4h1" />
      </svg>
    ),
  },
  {
    title: "Privacy First",
    description: "Your data is never stored or shared. We value your privacy above all.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.657 1.343 3 3 3s3-1.343 3-3zm6 0c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.657 1.343 3 3 3s3-1.343 3-3z"
        />
      </svg>
    ),
  },
  {
    title: "Personalized Recommendations",
    description: "Receive actionable advice tailored to your health profile.",
    icon: (
      <svg
        className="w-12 h-12 text-blue-600 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Key Features</h2>
        <p className="text-lg text-gray-600 mb-12">
          Discover what makes Gulita your trusted diabetes risk assessment companion.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-blue-50 rounded-2xl shadow p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
