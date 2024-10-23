// // EventContext.tsx
// import React, { createContext, useState, ReactNode } from 'react';


// // Create the context with a default value (can be `null` initially)
// export const EventContext = createContext<any | []>([]);

// // Define the provider's props type (children should be ReactNode)
// interface GlobalProviderProps {
//   children: ReactNode;
// }

// // Create the provider component
// export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
//   const [globalData, setGlobalData] = useState<any>();

//   return (
//     <GlobalContext.Provider value={{ globalData, setGlobalData }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// EventContext.tsx
import React, { createContext, useContext, useState,ReactNode } from 'react';

// Create the context
const EventContext = createContext<any>(null);

interface EventProviderProps {
    children: ReactNode;
   }

// Create a provider component
export const EventProvider : React.FC<EventProviderProps>  = ({ children }) => {
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  
  return (
    <EventContext.Provider value={{ selectedEvents, setSelectedEvents }}>
      {children}
    </EventContext.Provider>
  );
};

// Create a custom hook to use the context
export const useEventContext = () => {
  return useContext(EventContext);
};


