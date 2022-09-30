import { createContext, useState } from "react";

export const DateContext = createContext([]);

export const DateProvider = ({ children }) => {
  const [isDate, setDate] = useState([]);
  const [isLoading, setLoading] = useState(true);
  return (
    <DateContext.Provider
      value={{
        isDate,
        setDate,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
