'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { IData, getData } from "../api";
import { IData2, getData2 } from "../api";
import "./page.css";

export default function Page() {
  const [data, setData] = useState<IData[]>([]);
  const [data2, setData2] = useState<IData2[]>([]);
  const [guname, setGuname] = useState<string>("종로구");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await getData<IData[]>("/data");
        setData(fullData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterClick = async () => {
    setGuname(filter);
    try {
      const filteredData = await getData2<IData2[]>(`/data/filter?guname=${filter}`);
      setData2(filteredData);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">컬쳐랜드 (모든 데이터)</h1>

      <div className="input-wrapper">
        <label htmlFor="guname-input">Filter by Guname:</label>
        <input
          id="guname-input"
          type="text"
          value={filter}
          onChange={handleInputChange}
          placeholder="Enter guname"
        />
        <button onClick={handleFilterClick}>필터 적용하기</button>
      </div>

      <div className="table-wrapper">
        <h2>Full Data</h2>
        {data.length === 0 ? (
          <div className="noData">No data available</div>
        ) : (
          <div className="boxes-wrapper">
            {data.map((item) => (
              <div className="box" key={item.event_id}>
                <img src={item.main_img} alt={item.title} className="box-image" />
                <h3>{item.title}</h3>
                <p><strong>Event ID:</strong> {item.event_id}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Place:</strong> {item.place}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="table-wrapper">
        <h2>Filtered Data (Guname: {guname})</h2>
        {data2.length === 0 ? (
          <div className="noData">No data available</div>
        ) : (
          <div className="boxes-wrapper">
            {data2.map((item) => (
              <div className="box" key={item.event_id}>
                <img src={item.main_img} alt={item.title} className="box-image" />
                <h3>{item.title}</h3>
                <p><strong>Event ID:</strong> {item.event_id}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Place:</strong> {item.place}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/new">
        <button className="navigateButton">페이지 가기</button>
      </Link>
    </div>
  );
}
