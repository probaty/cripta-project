import React, { useContext, useState } from "react";
import { TickersContext } from "./TickersContext";
import LoadingIcon from "./LoadingIcon/LoadingIcon";
import "./TickersSection.css";

export default function TickersSection() {
  const { tickers } = useContext(TickersContext);
  const tickerList =
    tickers && tickers.length
      ? tickers.map((ticker) => (
          <TickerCard key={ticker.name} ticker={ticker} />
        ))
      : null;

  return tickers.length ? (
    <main>
      <h2 className="text-4xl font-mono uppercase text-gray-500 text-center mb-5">
        Список тикеров
      </h2>
      <div className="container p-4 bg-white rounded-lg shadow-xl grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickerList}
      </div>
    </main>
  ) : null;
}

function TickerCard(props) {
  const { name, price } = props.ticker;
  const { removeTicker } = useContext(TickersContext);
  const [cardHide, setCardHide] = useState(false);
  const loading = (
    <LoadingIcon
      background="transparent"
      border="none"
      big={true}
      width="5rem"
      height="5rem"
    />
  );
  const priceField = (
    <div className="h-20 mt-1 text-4xl font-semibold text-gray-700 flex justify-center items-center">
      <span>{price}</span>
    </div>
  );
  return (
    <div
      className={`bg-blue-50
        overflow-hidden
        rounded-lg
        border-blue-100 border-2 border-solid
        cursor-pointer
        flex
        flex-col
        justify-between
        ticker-card
         ${cardHide ? "hide-ticker" : ""} `}
    >
      <div className="px-4 py-5 sm:p-6 text-center">
        <div className=" font-medium text-gray-500 truncate uppercase">
          {name} - USD
        </div>

        <div className="flex justify-center items-center py-4">
          {price ? priceField : loading}
        </div>
      </div>
      <TickerButton
        deleteTicker={() => {
          setCardHide(true);
          setTimeout(() => removeTicker(name), 500);
        }}
      />
    </div>
  );
}

function TickerButton(props) {
  return (
    <button className="delete-btn" onClick={props.deleteTicker}>
      <svg
        className="h-5 w-5 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      Удалить
    </button>
  );
}
