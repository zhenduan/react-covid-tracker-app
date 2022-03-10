import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AppContext } from "../context";

const buildChartData = (data, castType) => {};

function Linechart() {
  const { location, casesType } = useContext(AppContext);
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  const state = {
    labels: x,
    datasets: [
      {
        label: "Cases",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: y,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result = data.cases;

          let labelsArray = [];
          let casesArray = [];
          for (const key in result) {
            labelsArray.push(key);
            casesArray.push(result[key]);
            // setY([...y, result[key]]);
          }
          setX(labelsArray);
          setY(casesArray);
          //   console.log(x);
          //   console.log(x);

          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);
  return (
    <div className="barchart__container">
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default Linechart;
