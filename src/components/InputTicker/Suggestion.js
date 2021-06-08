export default function Suggestion(props) {
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
    <SuggestionCell key={s} handleClick={() => props.handleClick(s)}>
      {s}
    </SuggestionCell>
  ));

  return (
    <div className="z-10 absolute top-full -my-1 w-44 left-0 bg-white py-1 shadow-xl rounded-md ">
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
      onKeyDown={(e) => {
        return e.key !== "Enter" || props.handleClick(props.children);
      }}
    >
      {props.children}
    </div>
  );
}
