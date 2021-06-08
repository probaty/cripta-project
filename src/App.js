import "./App.css";
import InputTicker from "./components/InputTicker/InputTicker";
import TickersSection from "./components/TickersSection";

function App() {
  return (
    <div className="App m-0 bg-blue-50">
      <div className="container mx-auto p-2 md:p-6">
        <header className="flex flex-col-reverse lg:flex-row lg:items-end items-center justify-between py-20">
          <InputTicker />
          <div className="font-mono text-6xl text-center pb-8 lg:pb-0 uppercase text-gray-600 flex-shrink-0">
            crypto-project
          </div>
        </header>
        <main>
          <TickersSection />
        </main>
      </div>
    </div>
  );
}

export default App;
