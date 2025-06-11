const steps = [
  {
    title: "Input Your Data",
    description:
      "Enter your health information such as age, BMI, blood pressure, and other relevant details into our secure form.",
  },
  {
    title: "AI Analysis",
    description:
      "Our advanced AI model analyzes your data instantly to assess your risk of diabetes, using the latest medical research.",
  },
  {
    title: "Get Your Result",
    description: "Receive a clear, personalized result and recommendations for next steps to manage your health.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10 text-center">How It Works</h2>
        <div className="relative">
          {/* Mobile: hide vertical line, Desktop: show */}
          <div className="hidden sm:block border-l-4 border-blue-200 absolute h-full left-6 top-0"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="mb-12 flex flex-col sm:flex-row items-center sm:items-start">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full z-10 sm:mr-6 font-bold text-xl shadow-lg mb-4 sm:mb-0">
                {idx + 1}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
