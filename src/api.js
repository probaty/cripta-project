import axios from "axios";

const API_KEY =
  "540628cf3b241bd01b2c534f8a2475c423767d4058542432e4688401614b4d58";

export const fetchCoinList = async () => {
  const coins = axios
    .get(
      `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${API_KEY}`
    )
    .then((r) => Object.keys(r.data.Data));

  return await coins;
};
