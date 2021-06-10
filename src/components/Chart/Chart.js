import React, { useContext } from "react";
import { TickersContext } from "../TickersContext";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

export default function Chart() {
  const { tickers, selectedTicker, clearSelection } =
    useContext(TickersContext);

  const selectedTickerData = tickers.filter((t) => t.name === selectedTicker);
  const chartData = selectedTickerData[0]?.chart;

  return (
    <>
      <hr className="w-full text-gray-500 mt-5" />
      <h2 className="text-4xl font-mono uppercase text-gray-500 text-center my-5 relative">
        график
        {selectedTicker && (
          <button
            className="h-8 w-8  absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 focus:outline-none text-gray-500 active:text-gray-700"
            onClick={clearSelection}
          >
            <svg
              className="fill-current"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 511.995 511.995"
            >
              <g>
                <g>
                  <path
                    d="M437.126,74.939c-99.826-99.826-262.307-99.826-362.133,0C26.637,123.314,0,187.617,0,256.005
			s26.637,132.691,74.993,181.047c49.923,49.923,115.495,74.874,181.066,74.874s131.144-24.951,181.066-74.874
			C536.951,337.226,536.951,174.784,437.126,74.939z M409.08,409.006c-84.375,84.375-221.667,84.375-306.042,0
			c-40.858-40.858-63.37-95.204-63.37-153.001s22.512-112.143,63.37-153.021c84.375-84.375,221.667-84.355,306.042,0
			C493.435,187.359,493.435,324.651,409.08,409.006z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M341.525,310.827l-56.151-56.071l56.151-56.071c7.735-7.735,7.735-20.29,0.02-28.046
			c-7.755-7.775-20.31-7.755-28.065-0.02l-56.19,56.111l-56.19-56.111c-7.755-7.735-20.31-7.755-28.065,0.02
			c-7.735,7.755-7.735,20.31,0.02,28.046l56.151,56.071l-56.151,56.071c-7.755,7.735-7.755,20.29-0.02,28.046
			c3.868,3.887,8.965,5.811,14.043,5.811s10.155-1.944,14.023-5.792l56.19-56.111l56.19,56.111
			c3.868,3.868,8.945,5.792,14.023,5.792c5.078,0,10.175-1.944,14.043-5.811C349.28,331.117,349.28,318.562,341.525,310.827z"
                  />
                </g>
              </g>
            </svg>
          </button>
        )}
      </h2>
      {selectedTicker && chartData.length ? (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={
              window.innerWidth > 500
                ? {
                    left: 20,
                  }
                : {}
            }
          >
            <CartesianGrid opacity={0.7} vertical={false} />
            <Bar dataKey="price" isAnimationActive={false} fill="#BFDBFE" />
            <Line
              type="monotone"
              dataKey="price"
              isAnimationActive={false}
              stroke="#60A5FA"
            />
            <XAxis dataKey="date" stroke="#111827" />
            <YAxis
              type="number"
              tickFormatter={(number) => `$${number}`}
              mirror={window.innerWidth < 500 ? true : false}
              scale="log"
              tickCount={5}
              stroke="#111827"
              domain={[
                (dataMin) => dataMin - dataMin * 0.0001,
                (dataMax) => dataMax + dataMax * 0.0001,
              ]}
            />

            <Tooltip content={<CustomTooltip />} />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <h4 className="text-xl font-mono text-gray-500 text-center mb-5">
          Выберите тикер, чтобы отобразить график
        </h4>
      )}
    </>
  );
}
function CustomTooltip({ active, payload, label }) {
  if (active) {
    const number = payload[0].value;
    return (
      <div className="bg-white px-3 py-2 rounded-md shadow-md">
        <h4>{label}</h4>
        <p>USD: {number}</p>
      </div>
    );
  }
  return null;
}
