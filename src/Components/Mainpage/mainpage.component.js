import React, { useState } from "react";
import { Link } from "react-router-dom";
import Service from "../../Service/service";

const Mainpage = () => {
  const [tableData, settableData] = useState([]);
  const [loading, setloading] = useState(false);
  const [warning, setwarning] = useState(false);
  const [more, setmore] = useState(false);

  const handleSearch = async (data) => {
    let query = data.target.value;
    if (query !== undefined && query.length >= 3) {
      setloading(true);
      const res = await Service.searchData(query);
      setloading(false);
      settableData(res);
      setmore(true);
    } else {
      setwarning(true);
      setmore(false);
      setTimeout(() => {
        setwarning(false);
      }, 3000);
    }
  };

  return (
    <div className="wrapper">
      <div className="logo"></div>
      <div className="logoText">Search web app</div>
      <div className="searchField">
        <input
          className="searchInput"
          type="text"
          placeholder={"Search anything"}
          onChange={handleSearch}
        />
        <button className="searchButton" onClick={handleSearch}>
          <label className="Ara">Ara</label>
        </button>
        <p
          hidden={!warning}
          style={{ color: "red", textAlign: "center", marginRight: "10vw" }}
        >
          Aranacak içerik en az 3 harf veya rakam olmalıdır.
        </p>
        <div className="results">
          <div hidden={!loading} className="loading"></div>
          {tableData.slice(0, 5).map((obj) => (
            <div key={obj.id}>
              <p>{obj.title}</p>
              <span>{obj.name} - {obj.createdAt.substring(0,4)}</span>
              <hr />
            </div>
          ))}
          <Link to={"/more"} style={{ textDecoration: 'none', color:"black" }}>
          <div style={{ textAlign: "center", cursor: "pointer", display: more ? "block" : "none" }}>
            <strong>Show more...</strong>
          </div></Link>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
