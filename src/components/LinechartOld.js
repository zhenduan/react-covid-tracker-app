import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context";
// import { buildChartData } from "../utils";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function Linechart() {
  const { location, casesType } = useContext(AppContext);
  const [data, setData] = useState({});

  useEffect(() => {
    //     var fetchUrl;
    //     if (location == "all") {
    //       fetchUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=365";
    //     } else {
    //       fetchUrl = `https://disease.sh/v3/covid-19/historical/${location}?lastdays=365`;
    //     }
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  //   useEffect(() => {
  //     var fetchUrl;
  //     if (location == "all") {
  //       fetchUrl = "https://disease.sh/v3/covid-19/historical/all?lastdays=365";
  //     } else {
  //       fetchUrl = `https://disease.sh/v3/covid-19/historical/${location}?lastdays=365`;
  //     }
  //     async function fetchCountries() {
  //       let response = await fetch(fetchUrl);
  //       response = await response.json();

  //       //   console.log(response);
  //       if (location == "all") {
  //         // setData(response.cases);
  //       } else {
  //         let chartData = buildChartData(data, casesType);
  //         if (response.timeline.cases) {
  //           setData(response.timeline.cases);
  //         }
  //       }
  //     }

  //     fetchCountries();
  //   }, [location]);

  //   if (data.length > 0) {
  //     console.log(data);
  //   }
  console.log(data);
  return (
    <div className="lineChart__container">
      <h3>Worldwide new cases</h3>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Linechart;
