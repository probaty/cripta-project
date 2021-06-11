import React, { Component, createContext } from "react";
import { subscribeTicker, unsubscribeTicker } from "../api";

export const TickersContext = createContext({});

export class TickersProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickers: [],
      selectedTicker: null,
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
      chart: [],
      error: false,
    };
    this.setState((state, props) => {
      return {
        tickers: [...state.tickers, currentTicker],
      };
    });

    subscribeTicker(tickerName, this.updateTicker);
  };

  removeTicker = (tickerName) => {
    if (this.state.selectedTicker === tickerName) {
      this.clearSelection();
    }
    this.setState((state, props) => {
      return {
        tickers: state.tickers.filter((t) => t.name !== tickerName),
      };
    });
    unsubscribeTicker(tickerName);
  };

  updateTicker = (tickerName, newPrice, error = false) => {
    if (this.state.tickers && this.state.tickers.length !== 0) {
      const dateNow = new Date().toTimeString().split(" ")[0].split(":");
      const dateFormatted = [dateNow[1], dateNow[2]].join(":");
      const chartData = {
        price: newPrice,
        date: dateFormatted,
      };
      this.setState((state, props) => {
        return {
          tickers: state.tickers.map((t) => {
            if (t.chart.length > 20) {
              t.chart.shift();
            }
            if (t.name === tickerName) {
              return {
                ...t,
                error: error,
                price: newPrice,
                chart: [...t.chart, chartData],
              };
            }
            return t;
          }),
        };
      });
    }
  };
  saveToLC = () => {
    localStorage.setItem(
      "tickers",
      JSON.stringify(
        this.state.tickers.map((t) => {
          return { ...t, chart: [] };
        })
      )
    );
  };

  selectTicker = (tickerName) => {
    const selectedTicker = this.state.tickers.find(
      (t) => t.name === tickerName
    );
    if (selectedTicker.error) return;
    if (this.state.selectedTicker === tickerName) return;
    this.setState({
      selectedTicker: tickerName,
    });
  };
  clearSelection = () => {
    this.setState({
      selectedTicker: null,
    });
  };

  render() {
    const tickers = this.state.tickers;
    const selectedTicker = this.state.selectedTicker;
    const addTicker = this.addTicker;
    const removeTicker = this.removeTicker;
    const selectTicker = this.selectTicker;
    const clearSelection = this.clearSelection;
    return (
      <TickersContext.Provider
        value={{
          tickers,
          addTicker,
          removeTicker,
          selectTicker,
          selectedTicker,
          clearSelection,
        }}
      >
        {this.props.children}
      </TickersContext.Provider>
    );
  }
}
