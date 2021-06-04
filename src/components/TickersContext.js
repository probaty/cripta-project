import React, { createContext, useState } from "react";

export const TickersContext = createContext({});

export const TickersProvider = ({ children }) => {
  const [tickers, setTickets] = useState([]);

  const addTicker = (ticket) => {
    setTickets([...tickers, ticket]);
  };

  const removeTicker = (ticket) => {
    setTickets(tickers.filter((t) => t.name !== ticket.name));
  };

  return (
    <TickersContext.Provider value={{ tickers, addTicker, removeTicker }}>
      {children}
    </TickersContext.Provider>
  );
};
