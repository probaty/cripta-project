import { fetchCoinList } from "./../../api";
import React, { Component, useState } from "react";
import "./InputTicker.css";

export default class InputTicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
      isLoading: true,
      inputValue: "",
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

  updateInputValue = (value) => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <>
        <label className="text-gray-600 font-medium text-sm  relative pb-2">
          Добавить тикер
          {!isLoading ? (
            <div className="flex shadow-md">
              <Input
                coins={this.state.coins}
                updateValue={this.updateInputValue}
                inputValue={this.state.inputValue}
              />
              <ButtonAdd />
            </div>
          ) : (
            <LoadRing />
          )}
        </label>
      </>
    );
  }
}

function LoadRing(props) {
  return (
    <div className="opacity-80 lds-dual-ring w-60 flex justify-center items-center py-1 bg-blue-200 border-blue-200 rounded-md border"></div>
  );
}

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
      onClick={(e) => {
        props.handleClick(props.children);
        e.preventDefault();
      }}
    >
      {props.children}
    </div>
  );
}

function ButtonAdd(props) {
  return (
    <button className="rounded-r-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none px-2">
      Добавить
    </button>
  );
}
