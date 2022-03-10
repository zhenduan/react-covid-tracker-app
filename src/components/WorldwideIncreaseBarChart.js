import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { AppContext } from "../context";

function WorldwideIncreaseBarChart() {
  const { location, casesType } = useContext(AppContext);
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  const state = {
    labels: x,
    datasets: [
      {
        label: `${casesType}`,
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
            // var singleResult = numeral(result[key]).format("0,0");
            // console.log(singleResult);
            // console.log(typeof singleResult);
            // var string = numeral(1000).format('0,0');

            casesArray.push(result[key]);
            // casesArray.push(singleResult);
            // setY([...y, result[key]]);
          }
          labelsArray.shift();
          //   loop cases array
          let increasedCasesArray = casesArray
            .slice(1)
            .map((v, i) => v - casesArray[i]);
          // set increaseVar
          //

          setX(labelsArray);
          setY(increasedCasesArray);
          //   console.log(x);
          //   console.log(x);

          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType, location]);
  return (
    <div className="barchart__container">
      <h3>{casesType} Increase Chart</h3>
      <Bar
        data={state}
        options={{
          title: {
            display: true,

            text: `New Covid-19 ${casesType} in Worldwide`,
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

export default WorldwideIncreaseBarChart;
