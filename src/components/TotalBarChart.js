import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { AppContext } from "../context";

const buildChartData = (data, castType) => {};

function TotalBarChart() {
  const { location, casesType } = useContext(AppContext);
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  const state = {
    labels: x,
    datasets: [
      {
        label: "Cases",
        backgroundColor: "rgb(53, 74, 120)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: y,
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result = data[casesType];

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
      <h3>{casesType} Chart</h3>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: `Worldwide Covid19 ${casesType} data`,
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

export default TotalBarChart;
