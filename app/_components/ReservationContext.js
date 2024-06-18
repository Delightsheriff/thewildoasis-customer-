"use client";

import { createContext, useState } from "react";
import { useContext } from "react";

const ReservationContext = createContext();

const initalstate = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initalstate);
  const resetRange = () => setRange(initalstate);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
