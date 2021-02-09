import React, { useState } from "react";
import { Link } from "react-router-dom";
import Service from "../Service/service";
import logo from "../../assets/img/logo.png";
import sorter from "../../assets/img/sorter.png";

const Fullsearch = () => {
  const [tableData, settableData] = useState([]);
  const [loading, setloading] = useState(false);
  const [warning, setwarning] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [objectsPerPage] = useState(7);

  const handleSearch = async (data) => {
    let query = data.target.value;
    if (query.length >= 3) {
      setloading(true);
      const res = await Service.searchData(query);
      setloading(false);
      settableData(res);
      setdisabled(false);
    } else {
      setwarning(true);
      setdisabled(true);
      setTimeout(() => {
        setwarning(false);
      }, 3000);
    }
  };

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const handleNext = () => {
    setcurrentPage(Number(currentPage + 1));
  };

  const indexOfLastobject = currentPage * objectsPerPage;
  const indexOfFirstobject = indexOfLastobject - objectsPerPage;
  const currentObjects = tableData.slice(indexOfFirstobject, indexOfLastobject);

  const renderObjects = currentObjects.map((object, index) => {
    return (
      <div key={index}>
        <p>{object.name}</p>
        <span>{object.title}</span>
        <hr />
      </div>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(tableData.length / objectsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <div key={number} className="pagination">
        <span
          className={currentPage === number ? "active" : ""}
          id={number}
          onClick={handleClick}
        >
          {number}
        </span>
      </div>
    );
  });

  const handleSelect = (data) => {
    if (tableData !== null) {
      var obj = [...tableData];
      switch (data.target.value) {
        case "1":
          settableData(obj.sort((a, b) => a.name.localeCompare(b.name)));
          break;
        case "2":
          settableData(obj.sort((a, b) => b.name.localeCompare(a.name)));
          break;
        case "3":
          settableData(
            obj.sort((a, b) =>
              a.createdAt
                .split("/")
                .reverse()
                .join()
                .localeCompare(b.createdAt.split("/").reverse().join())
            )
          );
          break;
        case "4":
          settableData(
            obj.sort((a, b) =>
              b.createdAt
                .split("/")
                .reverse()
                .join()
                .localeCompare(a.createdAt.split("/").reverse().join())
            )
          );
          break;
        default:
          break;
      }
    }
  };

  const options = [
    { label: "Name ascending", id: "1" },
    { label: "Name descending", id: "2" },
    { label: "Year ascending", id: "3" },
    { label: "Year descending", id: "4" },
  ];

  return (
    <div style={{ position: "relative", height: "100vh", padding: "30px" }}>
      <div className="header">
      <Link to={"/"}>
        <img src={logo} /></Link>
        <input
          className="fullSearch"
          type="text"
          placeholder={"Research in tech"}
          onChange={handleSearch}
        />
        <button className="fullSearchButton">
          <label className="search">Search</label>
        </button>
        <p
          hidden={!warning}
          style={{ color: "red", textAlign: "center", marginRight: "10vw" }}
        >
          Aranacak içerik en az 3 harf veya rakam olmalıdır.
        </p>
      </div>
      <div className="sorter">
        <img style={{ position: "relative", top: "5px" }} src={sorter} />
        <select
          placeholder={"Order By"}
          disabled={disabled}
          onChange={handleSelect}
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="table">
        <div hidden={!loading} className="loading"></div>
        <div>
          {renderObjects}
          <ul style={{ position: "relative",width:"80%" }} id="page-numbers">
            {renderPageNumbers}
          </ul>
          <span style={{display: loading ? "none" : "inline-block"}} className="nextButton" onClick={handleNext}>Next</span>
        </div>
      </div>
    </div>
  );
};

export default Fullsearch;
