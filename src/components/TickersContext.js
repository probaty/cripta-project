import React, { Component, createContext } from "react";
import { subscribeTicker, unsubscribeTicker } from "../api";

export const TickersContext = createContext({});

export class TickersProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickers: [],
    };
  }

  addTicker = (tickerName) => {
    const currentTicker = {
      name: tickerName,
      price: null,
    };
    this.setState((state, props) => {
      return {
        tickers: [...state.tickers, currentTicker],
      };
    });

    subscribeTicker(tickerName, this.updateTicker);
  };

  removeTicker = (tickerName) => {
    this.setState((state, props) => {
      return {
        tickers: state.tickers.filter((t) => t.name !== tickerName),
      };
    });

    unsubscribeTicker(tickerName);
  };

  updateTicker = (tickerName, newPrice) => {
    if (this.state.tickers && this.state.tickers.length !== 0)
      this.setState((state, props) => {
        return {
          tickers: state.tickers.map((t) => {
            if (t.name === tickerName) {
              return { ...t, price: newPrice };
            }
            return t;
          }),
        };
      });
  };

  render() {
    const tickers = this.state.tickers;
    const addTicker = this.addTicker;
    const removeTicker = this.removeTicker;
    return (
      <TickersContext.Provider value={{ tickers, addTicker, removeTicker }}>
        {this.props.children}
      </TickersContext.Provider>
    );
  }
}
