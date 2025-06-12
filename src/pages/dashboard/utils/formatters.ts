// A simple helper function to look up values or return the original value
const mapValue = (map: Record<string | number, string>, value: number) => map[value] || value.toString();

const ageMap: Record<number, string> = { 3: "Below 40", 5: "41-49", 7: "50-59", 9: "60 or older" };
const incomeMap: Record<number, string> = {
  1: "< 5jt IDR",
  3: "10-20jt IDR",
  5: "20-50jt IDR",
  7: "50-100jt IDR",
  8: "> 100jt IDR",
};
const physHlthMap: Record<number, string> = { 0: "Not at all", 7: "1-2 days", 15: "7-14 days", 30: "> 14 days" };
const highBPMap: Record<number, string> = { 0: "No", 1: "Yes" };
const educationMap: Record<number, string> = { 3: "Elementary", 4: "Junior High", 5: "Senior High", 6: "College" };
const genHlthMap: Record<number, string> = { 1: "1 (Poor)", 2: "2", 3: "3 (Good)", 4: "4", 5: "5 (Excellent)" };

// Define the type for a check result
export interface CheckResult {
  age: number;
  income: number;
  phys_hlth: number;
  high_bp: number;
  education: number;
  gen_hlth: number;
}

export const formatCheckDetails = (result: CheckResult) => ({
  age: mapValue(ageMap, result.age),
  income: mapValue(incomeMap, result.income),
  phys_hlth: mapValue(physHlthMap, result.phys_hlth),
  high_bp: mapValue(highBPMap, result.high_bp),
  education: mapValue(educationMap, result.education),
  gen_hlth: mapValue(genHlthMap, result.gen_hlth),
});
