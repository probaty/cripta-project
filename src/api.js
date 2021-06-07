import axios from "axios";

const tickerList = new Map();
const API_KEY =
  "540628cf3b241bd01b2c534f8a2475c423767d4058542432e4688401614b4d58";
const AGGREGATE_STATE = "5";

const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
);

export const fetchCoinList = async () => {
  const coins = axios
    .get(
      `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${API_KEY}`
    )
    .then((r) => Object.keys(r.data.Data));

  return await coins;
};

socket.addEventListener("message", (message) => {
  const {
    TYPE: type,
    FROMSYMBOL: ticker,
    PRICE: price,
  } = JSON.parse(message.data);

  if (type !== AGGREGATE_STATE || price === undefined) {
    return;
  }
  const handler = tickerList.get(ticker);
  if (handler === undefined) {
    return;
  }
  handler(ticker, price);
});

const sendMessageToWs = (message) => {
  const stringifiedMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
};

const subscribeToTickerOnWs = (ticker) => {
  sendMessageToWs({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
};
const unsubscribeToTickerOnWs = (ticker) => {
  sendMessageToWs({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  });
};

export const subscribeTicker = (tickerName, cb) => {
  tickerList.set(tickerName, cb);
  subscribeToTickerOnWs(tickerName);
};

export const unsubscribeTicker = (tickerName) => {
  tickerList.delete(tickerName);
  unsubscribeToTickerOnWs(tickerName);
};

window.ticker = tickerList;
