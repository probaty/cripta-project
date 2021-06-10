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
  const { tickers, selectedTicker } = useContext(TickersContext);

  const selectedTickerData = tickers.filter((t) => t.name === selectedTicker);
  const chartData = selectedTickerData[0]?.chart;

  return (
    <>
      <hr className="w-full text-gray-500 mt-5" />
      <h2 className="text-4xl font-mono uppercase text-gray-500 text-center my-5">
        график
      </h2>
      {selectedTicker ? (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={chartData}>
            <Bar dataKey="price" isAnimationActive={false} fill="#BFDBFE" />
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            <Line
              type="monotone"
              dataKey="price"
              isAnimationActive={false}
              stroke="#60A5FA"
            />
            <XAxis dataKey="date" scale="band" />
            <YAxis
              type="number"
              domain={[
                (dataMin) => dataMin - dataMin * 0.0001,
                (dataMax) => dataMax + dataMax * 0.0001,
              ]}
            />
            <Tooltip />
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
