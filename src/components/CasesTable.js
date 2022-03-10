import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context";

function CasesTable({ countries }) {
  let sortedCountries = countries.sort(function (a, b) {
    return b.cases - a.cases;
  });
  return (
    <div className="table__container">
      <table className="table__body">
        <thead>
          <tr>
            <th>Country</th>
            <th>Total Cases</th>
          </tr>
        </thead>

        <tbody>
          {sortedCountries.map((country) => {
            return (
              <tr key={country.country}>
                <td>{country.country}</td>
                <td>{country.cases}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CasesTable;
