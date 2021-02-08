import React, { useState } from "react";
import Service from "../Service/service";
import logo from "../../assets/img/logo.png";

const Fullsearch = () => {
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
    <div style={{ position: "relative", height: "100vh", padding: "30px" }}>
      <div className="header">
        <img src={logo} />
        <input
          className="fullSearch"
          type="text"
          placeholder={"Research in tech"}
          onChange={handleSearch}
        />
        <button className="fullSearchButton">
          <label className="search">Search</label>
        </button>
      </div>
      <div className="table">
        <div hidden={!loading} className="loading"></div>
        {tableData.slice(0, 5).map((obj) => (
          <div key={obj.id}>
            <p>{obj.name}</p>
            <span>{obj.title}</span>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fullsearch;
