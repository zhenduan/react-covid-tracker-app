import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context";
import { numberFormatter } from "../utils";

function CasesOverview() {
  const { location } = useContext(AppContext);
  const [selectCaseType, setSelectCaseType] = useState("cases");
  const [totalCases, setTotalCases] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [todayCases, setTodayCases] = useState(null);
  const [todayDeaths, setTodayDeaths] = useState(null);
  const [todayRecovered, setTodayRecovered] = useState(null);
  const [loading, setLoading] = useState(true);

  const { dispatchEvent } = useContext(AppContext);

  useEffect(() => {
    var fetchUrl;
    if (location == "all") {
      fetchUrl = "https://disease.sh/v3/covid-19/all";
    } else {
      fetchUrl = `https://disease.sh/v3/covid-19/countries/${location}`;
    }
    async function fetchCountries() {
      let response = await fetch(fetchUrl);
      response = await response.json();

      const {
        cases,
        recovered,
        deaths,
        todayCases,
        todayDeaths,
        todayRecovered,
      } = response;

      setTotalCases(cases);
      setRecovered(recovered);
      setDeaths(deaths);
      setTodayCases(todayCases);
      setTodayDeaths(todayDeaths);
      setTodayRecovered(todayRecovered);

      setLoading(false);

      //   setCountries(response);
      //   setLoading(false);
    }

    fetchCountries();
    dispatchEvent("SELECT_CASETYPE", { selectCaseType: selectCaseType });
  }, [location, loading, selectCaseType]);

  useEffect(() => {
    dispatchEvent("SELECT_CASETYPE", { selectCaseType: selectCaseType });
  }, [selectCaseType]);

  if (loading) {
    return <h5>loading</h5>;
  } else {
    return (
      <>
        <h2 className="overview__title">
          {" "}
          Covid-19 Data in {location == "all" ? "Worldwide" : location}
        </h2>
        <div className="overview__container">
          <div
            className="overview__box"
            onClick={() => setSelectCaseType("cases")}
          >
            <p className="overview__heading">Covid19 cases</p>
            <p className="overview__casesIncrease">
              +{numberFormatter(todayCases, 1)}
            </p>
            <p className="overview__total">
              {numberFormatter(totalCases, 1)} total
            </p>
          </div>

          <div
            className="overview__box"
            onClick={() => setSelectCaseType("recovered")}
          >
            <p className="overview__heading">Recovered</p>
            <p className="overview__recoveredIncrease">
              +{numberFormatter(todayRecovered, 1)}
            </p>
            <p className="overview__total">
              {numberFormatter(recovered, 1)} total
            </p>
          </div>

          <div
            className="overview__box"
            onClick={() => setSelectCaseType("deaths")}
          >
            <p className="overview__heading">Deaths</p>
            <p className="overview__deathsIncrease">
              +{numberFormatter(todayDeaths, 1)}
            </p>
            <p className="overview__total">
              {numberFormatter(deaths, 1)} total
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default CasesOverview;
