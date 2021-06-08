import { fetchCoinList } from "../../api";
import React, { Component } from "react";
import { TickersContext } from "../TickersContext";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Input from "./Input";

export default class InputTicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      isLoading: true,
      inputValue: "",
      tickerOver: false,
    };
  }

  async componentDidMount() {
    try {
      const coinsList = await fetchCoinList();
      this.setState(() => {
        return {
          coins: coinsList,
          isLoading: false,
        };
      });
    } catch {
      this.setState(() => {
        return {
          isLoading: false,
        };
      });
    }
  }

  addTicker = () => {
    if (this.state.inputValue) {
      const currentTickerName = this.state.inputValue.toUpperCase();
      if (this.checkTicker(currentTickerName)) {
        this.context.addTicker(currentTickerName);
        this.setState({
          inputValue: "",
        });
      }
    }
  };

  handleClickAddTicker = (tickerName) => {
    if (this.checkTicker(tickerName)) {
      this.context.addTicker(tickerName.toUpperCase());
      console.log(123);
      this.setState({
        inputValue: "",
      });
      return;
    }
    this.setState({
      inputValue: tickerName,
    });
  };

  checkTicker = (tickerName) => {
    if (this.context.tickers.find((t) => t.name === tickerName)) {
      this.setState({
        tickerOver: true,
      });
      return false;
    }
    return true;
  };

  updateInputValue = (value) => {
    this.setState({
      inputValue: value,
      tickerOver: false,
    });
  };

  render() {
    const { isLoading } = this.state;
    const errorMessage = this.state.tickerOver && "Такой тикер уже добавлен";

    return (
      <>
        <label className="text-gray-600 font-medium text-sm  relative pb-2">
          Добавить тикер
          {!isLoading ? (
            <div>
              <div className="flex shadow-md">
                <Input
                  addTicker={this.addTicker}
                  coins={this.state.coins}
                  updateValue={this.updateInputValue}
                  inputValue={this.state.inputValue}
                  handleClickAddTicker={this.handleClickAddTicker}
                />
                <ButtonAdd addTicker={this.addTicker} />
              </div>
              {this.state.tickerOver && (
                <div className="text-sm text-red-600">{errorMessage}</div>
              )}
            </div>
          ) : (
            <LoadingIcon />
          )}
        </label>
      </>
    );
  }
}
InputTicker.contextType = TickersContext;

function ButtonAdd(props) {
  return (
    <button
      onClick={props.addTicker}
      className="rounded-r-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none px-2"
    >
      Добавить
    </button>
  );
}
