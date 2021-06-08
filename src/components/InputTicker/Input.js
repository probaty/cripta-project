import React, { useState } from "react";
import Suggestion from "./Suggestion";

export default function Input(props) {
  const [hiddenSuggestion, hideSuggestion] = useState(false);

  const handleChange = (event) => {
    props.updateValue(event.target.value);
    hideSuggestion(false);
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
          handleClick={props.handleClickAddTicker}
        />
      )}
    </div>
  );
}
