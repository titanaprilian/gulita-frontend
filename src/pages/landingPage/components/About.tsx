import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import stethoscopeImg from "@/assets/stetoscope.avif";

const About = () => {
  return (
    <section id="about" className="py-28 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 opacity-20 rounded-full blur-2xl z-0" />

      <div className="relative max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 z-10">
        {/* === Image Section === */}
        <motion.div
          className="flex-1 flex justify-center md:justify-start"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src={stethoscopeImg}
            alt="Teamwork for health"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-xl border-4 border-white bg-white"
          />
        </motion.div>

        {/* === Text Content Section === */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">About Gulita</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 font-medium">
            Gulita empowers you to take charge of your health with instant, AI-powered diabetes risk assessments. Our
            mission is to make early detection and awareness of diabetes simple, fast, and accessible for everyone.
          </p>
          <ul className="text-base md:text-lg text-gray-600 mb-6 space-y-3 text-left md:text-left mx-auto md:mx-0 max-w-md">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <span>Easy-to-use, privacy-first platform</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <span>Backed by advanced machine learning</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <span>Personalized recommendations for a healthier life</span>
            </li>
          </ul>
          <p className="text-base text-gray-500">
            We believe technology bridges the gap between people and healthcare. Join us in building a healthier
            future—one check at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
