import React,{ createContext, useState,  useContext } from "react";
import type { ReactNode } from "react";
// Define type for feedback data
type FeedbackData = {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
};

// Define type for context
type FeedbackContextType = {
  feedback: FeedbackData;
  setFeedback: React.Dispatch<React.SetStateAction<FeedbackData>>;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

// Default initial state
const defaultFeedback: FeedbackData = {
  name: "",
  email: "",
  rating: "",
  feedback: "",
};

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [feedback, setFeedback] = useState<FeedbackData>(defaultFeedback);

  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Custom hook for consuming context
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used inside FeedbackProvider");
  }
  return context;
};
