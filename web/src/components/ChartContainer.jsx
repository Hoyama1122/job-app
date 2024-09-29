import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaCharts from "./AreaCharts";

const ChartContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <section className="mt-16 text-center"> 
      <h4 className="mb-3 text-lg font-semibold">Monthly Applications</h4> 
      <button
        className="bg-transparent border-none capitalize text-primary-500 text-xl cursor-pointer mb-4" 
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "Show Area Chart" : "Show Bar Chart"}
      </button>
      
      {barChart ? <BarChart data={data} /> : <AreaCharts data={data} />}
    </section>
  );
};

export default ChartContainer;
