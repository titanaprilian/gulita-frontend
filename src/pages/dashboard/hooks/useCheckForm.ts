// src/pages/dashboard/hooks/useCheckForm.ts
import { useReducer } from "react";
import type { FormState } from "../data/checkSteps";

// --- State and Action Types ---
interface State {
  step: number;
  form: FormState;
  result: string | null;
  isLoading: boolean;
  error: string | null;
}
type Action =
  | { type: "SET_ANSWER"; payload: { name: keyof FormState; value: string } }
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; payload: string }
  | { type: "SUBMIT_FAILURE"; payload: string }
  | { type: "RESET" };

// --- Initial State ---
const initialState: State = {
  step: 0,
  form: { bmi: "", age: "", gen_hlth: "", income: "", high_bp: "", phys_hlth: "", education: "" },
  result: null,
  isLoading: false,
  error: null,
};

// --- The Reducer Function ---
function formReducer(state: State, action: Action): State {
  // ... same reducer logic from the previous step ...
  switch (action.type) {
    case "SET_ANSWER":
      return { ...state, form: { ...state.form, [action.payload.name]: action.payload.value } };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREVIOUS_STEP":
      return { ...state, step: Math.max(0, state.step - 1) };
    case "SUBMIT_START":
      return { ...state, isLoading: true, error: null };
    case "SUBMIT_SUCCESS":
      return { ...state, isLoading: false, result: action.payload, step: state.step + 1 };
    case "SUBMIT_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// --- The Custom Hook ---
export const useCheckForm = () => {
  return useReducer(formReducer, initialState);
};
