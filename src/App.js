import "./App.css";
import InputTicker from "./components/InputTicker/InputTicker";
import TickersSection from "./components/TickersSection/TickersSection";
import Chart from "./components/Chart/Chart";
import { TickersContext } from "./components/TickersContext";
import { useContext } from "react";

function App() {
  const { tickers } = useContext(TickersContext);
  return (
    <div className="App m-0 bg-blue-50">
      <div className="container mx-auto p-0 md:p-6">
        <header className="flex flex-col-reverse lg:flex-row lg:items-end items-center justify-between py-20">
          <InputTicker />
          <div className="font-mono text-6xl text-center pb-8 lg:pb-0 uppercase text-gray-600 flex-shrink-0">
            crypto-project
          </div>
        </header>
        <main>
          <h2 className="text-4xl font-mono uppercase text-gray-500 text-center mb-5">
            Список тикеров
          </h2>
          {tickers.length ? (
            <div className="container p-2 md:p-4 bg-white rounded-lg md:shadow-xl ">
              <TickersSection />
              <Chart />
            </div>
          ) : (
            <h4 className="text-xl font-mono text-gray-500 text-center mb-5">
              Добавьте тикер, чтобы показать список
            </h4>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
