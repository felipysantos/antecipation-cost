import { createContext, useState } from "react";

export const DateContext = createContext([]);

export const DateProvider = ({ children }) => {
  const [isDate, setDate] = useState([]);

  return (
    <DateContext.Provider
      value={{
        isDate,
        setDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
