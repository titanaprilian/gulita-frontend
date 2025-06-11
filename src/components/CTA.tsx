import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-800 opacity-20 rounded-full blur-2xl z-0" />
      <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
          Ready to take control of your health?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8">
          Try Gulita’s AI-powered diabetes risk assessment now and get instant, personalized results.
        </p>
        <Link
          to="/test"
          className="inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg text-lg hover:bg-blue-50 transition-colors duration-200"
        >
          Try Diabetes Test
        </Link>
      </div>
    </section>
  );
};

export default CTA;
