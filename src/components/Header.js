import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, TextField } from "@material-ui/core";

function Header() {
  const [countries, setCountries] = useState([]);
  const [location, setLocation] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const { dispatchEvent } = useContext(AppContext);

  useEffect(() => {
    async function fetchCountries() {
      let response = await fetch("https://disease.sh/v3/covid-19/countries");
      response = await response.json();
      setCountries(response);
    }

    fetchCountries();

    dispatchEvent("SELECT_LOCATION", { location: location });
  }, [location]);

  const searchHandler = () => {
    setLocation(searchInput);
    setSearchInput("");
  };

  return (
    <div className="header__container">
      <div className="header__logo">
        <h1>Covid19 Tracker</h1>
      </div>

      <div className="header__searchContainer">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          className="header__searchBtn"
          variant="contained"
          color="primary"
          onClick={searchHandler}
        >
          Search
        </Button>
      </div>

      <div className="header__selector">
        <FormControl>
          <InputLabel id="demo-simple-select-label"> Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            defaultValue="all"
          >
            <MenuItem value={"all"}>Worldwide</MenuItem>
            {countries.map((country) => {
              return (
                <MenuItem value={country.country} key={country.country}>
                  {country.country}
                </MenuItem>
              );
            })}

            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Header;
