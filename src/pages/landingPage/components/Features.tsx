import { Zap, ShieldCheck, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Instant AI Analysis",
    description: "Get your diabetes risk result in seconds, powered by advanced machine learning.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description: "Your data is never stored or shared. We value your privacy above all.",
    icon: ShieldCheck,
  },
  {
    title: "Personalized Recommendations",
    description: "Receive actionable advice tailored to your health profile.",
    icon: UserCheck,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-50/70">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 mb-12">
            Discover what makes Gulita your trusted diabetes risk assessment companion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon; // Assign the component to a variable with a capital letter
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }} // Staggered delay
                >
                  <Card className="h-full text-center flex flex-col transition-transform duration-300 hover:-translate-y-2">
                    <CardHeader className="items-center">
                      <div className="bg-blue-100 p-4 rounded-full mb-4 max-w-max mx-auto">
                        <IconComponent className="text-blue-600" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
