import { fetchCoinList } from "../api";
import React, { Component, useState } from "react";
import { TickersContext } from "./TickersContext";
import LoadingIcon from "./LoadingIcon/LoadingIcon";

export default class InputTicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      isLoading: true,
      inputValue: "",
      tickerOver: false,
      tickerNotExists: false,
    };
  }

  async componentDidMount() {
    const coinsList = await fetchCoinList();

    this.setState(() => {
      return {
        coins: coinsList,
        isLoading: false,
      };
    });
  }

  addTicker = () => {
    if (this.state.inputValue) {
      const currentTicker = {
        name: this.state.inputValue.toUpperCase(),
        price: "-",
      };
      if (this.checkTicker(currentTicker.name)) {
        this.context.addTicker(currentTicker);
        this.setState({
          inputValue: "",
        });
      }
    }
  };

  checkTicker = (tickerName) => {
    if (this.context.tickers.find((t) => t.name === tickerName)) {
      this.setState({
        tickerOver: true,
      });
      return false;
    }
    if (!this.state.coins.find((t) => t === tickerName)) {
      this.setState({
        tickerNotExists: true,
      });
      return false;
    }
    return true;
  };

  updateInputValue = (value) => {
    this.setState({
      inputValue: value,
      tickerOver: false,
      tickerNotExists: false,
    });
  };

  render() {
    const { isLoading } = this.state;
    const errorMessage = this.state.tickerNotExists
      ? "Такого тикера не существует"
      : "Такой тикер уже добавлен";

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
                />
                <ButtonAdd addTicker={this.addTicker} />
              </div>
              {(this.state.tickerNotExists || this.state.tickerOver) && (
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

function Input(props) {
  const [hiddenSuggestion, hideSuggestion] = useState(false);

  const handleChange = (event) => {
    props.updateValue(event.target.value);
    hideSuggestion(false);
  };

  const handleSuggestionClick = (value) => {
    props.updateValue(value);
    hideSuggestion(true);
  };
  const handleOnBlur = (e) => {
    if (e.relatedTarget === null) {
      hideSuggestion(true);
    }
  };

  const handleOnFocus = () => {
    hideSuggestion(false);
  };

  return (
    <div>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") return props.addTicker();
        }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleChange}
        value={props.inputValue}
        type="text"
        className="block
              w-44
              border-2
              border-transparent
              text-gray-900
              focus:outline-none
              focus:ring-1
              focus:border-2
              focus:ring-blue-300
              focus:border-blue-300
              sm:text-sm
              rounded-l-md "
      />

      {!hiddenSuggestion && (
        <Suggestion
          inputValue={props.inputValue}
          coins={props.coins}
          handleClick={handleSuggestionClick}
        />
      )}
    </div>
  );
}

function Suggestion(props) {
  function autoSuggestions() {
    const inputValue = props.inputValue.trim().toLowerCase();
    const inputLength = inputValue.length;
    const coins = props.coins;

    return inputLength === 0
      ? []
      : coins
          .filter(
            (coin) => coin.toLowerCase().slice(0, inputLength) === inputValue
          )
          .slice(0, 7);
  }

  if (autoSuggestions().length <= 1) return null;

  const suggestionList = autoSuggestions().map((s) => (
    <SuggestionCell key={s} handleClick={props.handleClick}>
      {s}
    </SuggestionCell>
  ));

  return (
    <div className="absolute top-full -my-1 w-44 left-0 bg-white py-1 shadow-xl rounded-md ">
      {suggestionList}
    </div>
  );
}

function SuggestionCell(props) {
  return (
    <div
      className="px-2 py-1 cursor-pointer text-base hover:bg-blue-100 text-gray-500"
      tabIndex={0}
      onClick={() => props.handleClick(props.children)}
    >
      {props.children}
    </div>
  );
}

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
