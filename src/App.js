import "./App.css";
import InputTicker from "./components/InputTicker/InputTicker";

function App() {
  return (
    <div className="App m-0 bg-blue-50">
      <div className=" container mx-auto">
        <header className="flex flex-col-reverse md:flex-row md:items-end items-center justify-around py-8">
          <InputTicker />
          <div className="title font-mono text-6xl text-center pb-4 md:pb-0 uppercase text-gray-600 flex-shrink-0">
            crypto-project
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
