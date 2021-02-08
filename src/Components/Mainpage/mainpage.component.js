import React, { useState } from "react";
import Service from "../Service/service";

const Mainpage = () => {
  const [tableData, settableData] = useState([]);
  const [loading, setloading] = useState(false);

  const handleSearch = async (data) => {
    let query = data.target.value;
    if (query.length >= 3) {
      setloading(true);
      const res = await Service.searchData(query);
      setloading(false);
      settableData(res);
    }
  };

  return (
    <div className="wrapper">
      <div className="logo"></div>
      <div className="searchField">
        <input
          className="searchInput"
          type="text"
          placeholder={"Search anything"}
          onChange={handleSearch}
        />
        <button className="searchButton">
          <label className="Ara">Ara</label>
        </button>
        <div className="results">
          <div hidden={!loading} className="loading"></div>
          {tableData.slice(0, 5).map((obj) => (
            <div key={obj.id}>
              <p>{obj.name}</p>
              <span>{obj.title}</span>
              <hr />
            </div>
          ))}
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <strong>Show more...</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
