import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">Simple Steps to Your Result</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Our process is designed to be quick, easy, and completely secure.
          </p>
        </motion.div>

        {/* The Timeline Container */}
        <div className="relative">
          {/* The vertical line, Hide on mobile */}
          <div className="hidden sm:block border-l-4 border-blue-200 absolute h-full left-6 top-0" />

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="mb-12 flex flex-col sm:flex-row items-center sm:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                {/* Numbered Circle */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full z-10 sm:mr-6 font-bold text-xl shadow-lg mb-4 sm:mb-0">
                  {idx + 1}
                </div>

                {/* Step Content Card */}
                <Card className="flex-1 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary text-center sm:text-left">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
