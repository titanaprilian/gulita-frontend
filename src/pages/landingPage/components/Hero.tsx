import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CheckBloodImage from "@/assets/check-blood.avif"; // Adjust the path as necessary

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 md:gap-12 h-full min-h-[70vh]">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Take Control of Your Health with <span className="text-blue-600">Gulita</span>
          </h1>
          <p className="text-lg md:text-lg text-gray-600 mb-8">
            Gulita helps you understand your risk of diabetes and empowers you to take action. Discover how our
            AI-powered model can help you make informed decisions about your health.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button variant="primary" asChild className="px-8 py-6 text-lg">
              <Link to="/test">Try Diabetes Test</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-6 text-lg">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative w-96 h-96 md:w-[18rem] md:h-[18rem] lg:w-[24rem] lg:h-[24rem] xl:w-[28rem] xl:h-[28rem] flex items-center justify-center">
            <img
              src={CheckBloodImage}
              alt="Diabetes awareness illustration"
              className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 bg-white transition-transform duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
