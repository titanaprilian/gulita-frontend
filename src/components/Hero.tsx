import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 md:gap-24 h-full min-h-[70vh]">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Take Control of Your Health with <span className="text-blue-600">Gulita</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Gulita helps you understand your risk of diabetes and empowers you to take action. Discover how our
            AI-powered model can help you make informed decisions about your health.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/test"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-200"
            >
              Try Diabetes Test
            </Link>
            <a
              href="#how-it-works"
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-semibold shadow hover:bg-blue-50 transition-colors duration-200"
            >
              How It Works
            </a>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1685660375199-9b35cb7a6c22?q=80&w=1200&auto=format&fit=crop"
              alt="Diabetes awareness illustration"
              className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 bg-white transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
