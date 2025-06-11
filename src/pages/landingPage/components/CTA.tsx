import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-blue-600 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-16 -left-16 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-800 opacity-20 rounded-full blur-2xl z-0" />

      <motion.div
        className="relative max-w-3xl mx-auto px-4 text-center z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
          Ready to take control of your health?
        </h2>
        <p className="text-lg md:text-xl text-blue-100 mb-8">
          Try Gulita’s AI-powered diabetes risk assessment now and get instant, personalized results.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link to="/test">Try Diabetes Test</Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default CTA;
