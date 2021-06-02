import React, { createContext, useState } from "react";

export const TicketsContext = createContext({});

export const TicketsProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const addTicker = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  const removeTicker = (ticket) => {
    setTickets(tickets.filter((t) => t.name !== ticket.name));
  };

  return (
    <TicketsContext.Provider value={{ tickets, addTicker, removeTicker }}>
      {children}
    </TicketsContext.Provider>
  );
};
