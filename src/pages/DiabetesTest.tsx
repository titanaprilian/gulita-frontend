import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DiabetesTest = () => {
  const [form, setForm] = useState({
    bmi: "",
    age: "",
    income: "",
    education: "",
    gen_hlth: "",
    phys_hlth: "",
    ment_hlth: "",
  });

  const navigate = useNavigate();

  // Placeholder for form submission
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert all form values to float64 before sending
    const floatForm = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, parseFloat(value)]));

    const payload = floatForm;

    console.log("Submitting form with payload:", payload);

    try {
      const response = await fetch("http://localhost:3000/api/v1/checks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      console.log("Prediction result from FastAPI:", data);
      navigate("/result", { state: { prediction: data } });
    } catch (error) {
      console.log();
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white py-16 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-blue-700 bg-white/80 hover:bg-blue-100 rounded-lg px-4 py-2 shadow transition-colors duration-200 text-lg font-semibold z-20"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-blue-100"
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Diabetes Risk Assessment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* age group */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Age Group</label>
            <select
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select age group</option>
              <option value="3">Below 40</option>
              <option value="5">41-49</option>
              <option value="7">50-59</option>
              <option value="9">60 or older</option>
            </select>
          </div>
          {/* bmi */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">BMI</label>
            <input
              type="number"
              name="bmi"
              value={form.bmi}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              min="0"
              step="0.1"
              required
            />
          </div>
          {/* Physical Health */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">
              How many days in the past 30 days you feel physically ill or injured?
            </label>
            <select
              name="phys_hlth"
              value={form.phys_hlth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select</option>
              <option value="0">Not at all</option>
              <option value="7">1-2 days</option>
              <option value="15">7-14 days</option>
              <option value="30">More than 14 days</option>
            </select>
          </div>
          {/* Mental Health */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">How would you rate your mental health?</label>
            <select
              name="ment_hlth"
              value={form.ment_hlth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select</option>
              <option value="0">Good</option>
              <option value="15">Fair</option>
              <option value="30">Poor</option>
            </select>
          </div>
          {/* education */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">What is your highest level of education?</label>
            <select
              name="education"
              value={form.education}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select</option>
              <option value="3">Elementary School</option>
              <option value="4">Junior High School</option>
              <option value="5">Senior High School</option>
              <option value="6">College</option>
            </select>
          </div>
          {/* income */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">What is your annual income?</label>
            <select
              name="income"
              value={form.income}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select</option>
              <option value="1">Below 5 million IDR</option>
              <option value="3">10-20 million IDR</option>
              <option value="5">20-50 million IDR</option>
              <option value="7">50-100 million IDR</option>
              <option value="8">Above 100 million IDR</option>
            </select>
          </div>
          {/* General Health */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">From scale 1-5, how would you rate your general health?</label>
            <select
              name="gen_hlth"
              value={form.gen_hlth}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 text-lg mt-2"
        >
          Check My Risk
        </button>
      </form>
    </div>
  );
};

export default DiabetesTest;
