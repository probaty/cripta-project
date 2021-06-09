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

  componentDidUpdate = () => {
    this.saveToLC();
  };

  componentDidMount = () => {
    const tickersFromLC = JSON.parse(localStorage.getItem("tickers"));
    if (tickersFromLC !== null && tickersFromLC.length) {
      this.setState({
        tickers: tickersFromLC,
      });
      tickersFromLC.forEach((ticker) =>
        subscribeTicker(ticker.name, this.updateTicker)
      );
    }
  };

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

  saveToLC = () => {
    localStorage.setItem("tickers", JSON.stringify(this.state.tickers));
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
