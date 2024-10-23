import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context
const SelectedEventsContext = createContext<any>(null);

// Create a provider component
export const SelectedEventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  return (
    <SelectedEventsContext.Provider value={{ selectedEvents, setSelectedEvents }}>
      {children}
    </SelectedEventsContext.Provider>
  );
};

// Custom hook to use selected events context
export const useSelectedEvents = () => {
  return useContext(SelectedEventsContext);
};
