import { useEffect, useState } from "react";

const Result = () => {
  type CheckResult = {
    id: string;
    created_at: string;
    diabetes_result: number;
    bmi: number;
    age: number;
    income: number;
    phys_hlth: number;
    education: number;
    gen_hlth: number;
    high_bp: number;
  };
  const [results, setResults] = useState<CheckResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return setLoading(false);
      try {
        const response = await fetch("http://localhost:3000/api/v1/users/checks", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) return setLoading(false);
        const data = await response.json();
        if (data.status === "success" && data.data && Array.isArray(data.data.history)) {
          setResults(data.data.history);
        }
      } catch {
        // ignore error
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Helper maps for value-to-label conversion
  const ageMap: Record<string | number, string> = {
    3: "Below 40",
    5: "41-49",
    7: "50-59",
    9: "60 or older",
  };
  const incomeMap: Record<string | number, string> = {
    1: "Below 5 million IDR",
    3: "10-20 million IDR",
    5: "20-50 million IDR",
    7: "50-100 million IDR",
    8: "Above 100 million IDR",
  };
  const physHlthMap: Record<string | number, string> = {
    0: "Not at all",
    7: "1-2 days",
    15: "7-14 days",
    30: "More than 14 days",
  };
  const highBP: Record<string | number, string> = {
    0: "No",
    1: "Yes",
  };
  const educationMap: Record<string | number, string> = {
    3: "Elementary School",
    4: "Junior High School",
    5: "Senior High School",
    6: "College",
  };
  const genHlthMap: Record<string | number, string> = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Results</h2>
      <p className="text-lg text-gray-700 mb-6">View your diabetes test results here.</p>
      <div className="space-y-6">
        {loading ? (
          <div className="bg-blue-50 rounded-xl p-6 shadow text-center text-gray-500">Loading...</div>
        ) : results.length === 0 ? (
          <div className="bg-blue-50 rounded-xl p-6 shadow text-center text-gray-500">
            No results found. Take a diabetes test to see your results here.
          </div>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-1">
                  Test Date: {new Date(result.created_at).toLocaleDateString()}
                </div>
                <div className="text-lg font-semibold text-blue-700 mb-2">
                  Risk: {result.diabetes_result === 1 ? "High" : result.diabetes_result === 0 ? "Low" : "Unknown"}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-gray-700 text-sm">
                  <div>
                    <span className="font-medium">BMI:</span> {result.bmi}
                  </div>
                  <div>
                    <span className="font-medium">Age Group:</span> {ageMap[result.age] || result.age}
                  </div>
                  <div>
                    <span className="font-medium">Income:</span> {incomeMap[result.income] || result.income}
                  </div>
                  <div>
                    <span className="font-medium">Past 30 days you feel physically ill</span>{" "}
                    {physHlthMap[result.phys_hlth] || result.phys_hlth}
                  </div>
                  <div>
                    <span className="font-medium">Education:</span> {educationMap[result.education] || result.education}
                  </div>
                  <div>
                    <span className="font-medium">General Health:</span>{" "}
                    {genHlthMap[result.gen_hlth] || result.gen_hlth}
                  </div>
                  <div>
                    <span className="font-medium">High Blood Pressure:</span> {highBP[result.high_bp] || result.high_bp}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Result;
