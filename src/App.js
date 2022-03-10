import { useEffect, useState } from "react";
import "./App.css";
import { AppContext } from "./context";
import CasesOverview from "./components/CasesOverview";
import Header from "./components/Header";
import CasesTable from "./components/CasesTable";
import Linechart from "./components/Linechart";
import TotalBarChart from "./components/TotalBarChart";
import WorldwideIncreaseBarChart from "./components/WorldwideIncreaseBarChart";
import CountryIncreaseBarChart from "./components/CountryIncreaseBarChart";
import DataMap from "./components/DataMap";

function App() {
  const [countries, setCountries] = useState([]);
  const [location, setLocation] = useState("all");
  const [casesType, setCasesType] = useState("cases");
  const [loading, setLoading] = useState(true);

  // Context API
  const dispatchEvent = (actionType, payload) => {
    switch (actionType) {
      case "SELECT_LOCATION":
        setLocation(payload.location);
        return;
      case "SELECT_CASETYPE":
        setCasesType(payload.selectCaseType);
        return;
      // case "REMOVE_USER":
      //   setUsers(users.filter((user) => user.id !== payload.userId));
      //   return;
      default:
        return;
    }
  };
  useEffect(() => {
    async function fetchCountries() {
      let response = await fetch("https://disease.sh/v3/covid-19/countries");
      response = await response.json();
      setCountries(response);
      setLoading(false);
    }

    fetchCountries();
  }, []);
  // console.log(countries);
  if (loading) {
    return <h5>Loading</h5>;
  } else {
    return (
      <AppContext.Provider
        value={{ location, dispatchEvent, casesType, countries }}
      >
        <div className="App">
          <div className="app__container">
            <div className="app__leftCol">
              <Header />
              <CasesOverview />
              {/* <TotalBarChart /> */}

              {location == "all" && <WorldwideIncreaseBarChart />}
              {location != "all" && <CountryIncreaseBarChart />}
              <DataMap />

              {/* <Linechart /> */}
            </div>
            <div className="app__rightCol">
              <CasesTable countries={countries} />
              {/* <Linechart /> */}
              {/* <BarChart /> */}
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
