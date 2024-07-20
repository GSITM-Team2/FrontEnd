'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { IData, getData } from "../api";
import { IData2, getData2 } from "../api";
import "./page.css";
import Image from 'next/image';
import seoulImage from '/public/img/seoul.png';
import Head from 'next/head';

const ITEMS_PER_PAGE = 12;

export default function Page() {

  const [data, setData] = useState<IData[]>([]);
  const [data2, setData2] = useState<IData2[]>([]);

  const [guname, setGuname] = useState<string>("종로구");
  const [filter, setFilter] = useState<string>("");

  const [filterType, setFilterType] = useState<string>("guname"); 
  const [currentPageFull, setCurrentPageFull] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await getData<IData[]>("/data");
        setData(fullData);
      } catch (error) {
        console.error("NullData1", error);
      }
    };

    fetchData();
  }, []);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };



  const handleFilterClick = async () => {
    setGuname(filter);
    setCurrentPage(1); 
    setIsFiltered(true);
    try {
      const filteredData = await getData2<IData2[]>(`/data/filter?${filterType}=${filter}`);
      setData2(filteredData);
    } catch (error) {
      console.error("NullData2", error);
    }
  };


  //페이지 Slice 작업
  const totalPagesFull = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedDataFull = data.slice((currentPageFull - 1) * ITEMS_PER_PAGE, currentPageFull * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data2.length / ITEMS_PER_PAGE);
  const paginatedData = data2.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const handlePageChangeFull = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPagesFull) {
      setCurrentPageFull(newPage);
    }
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const 메인페이지이동 = () => {
    setFilter("");
    setGuname("");
    setCurrentPage(1);
    setCurrentPageFull(1);
    setIsFiltered(false);
  };


  return (
    <div className="container">
      <div className="header-container">
        <img src="/img/seoul.png" alt="Seoul" className="header-image-large" />
      </div>
      
      <h1 className="heading">컬쳐랜드</h1>

      <div className="input-wrapper">
  <div className="search-bar-container">
    <select id="filter-type" value={filterType} onChange={handleFilterTypeChange} className="filter-dropdown">
      <option value="guname">자치구</option>
      <option value="codename">분류</option>
    </select>
    <input
      id="filter-input"
      type="text"
      value={filter}
      onChange={handleInputChange}
      className="search-bar"
    />
    <button onClick={handleFilterClick} className="filter-button">필터 적용하기</button>
  </div>
</div>

      {!isFiltered ? (
        <>
          <div className="table-wrapper">
            <h2>모든 데이터</h2>
            {data.length === 0 ? (
              <div className="noData">Null</div>
            ) : (
              <div className="boxes-wrapper">
                {paginatedDataFull.map((item) => (
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

          <div className="pagination-controls">
            <button onClick={() => handlePageChangeFull(currentPageFull - 1)} disabled={currentPageFull === 1}>
              이전
            </button>
            <span>페이지 {currentPageFull} | {totalPagesFull}</span>
            <button onClick={() => handlePageChangeFull(currentPageFull + 1)} disabled={currentPageFull === totalPagesFull}>
              다음
            </button>
          </div>
        </>
      ) : (
        <div className="table-wrapper">
          <h2>{filterType === "codename" ? "분류" : "필터 적용: 자치구"} : {filter}
          </h2>
          {data2.length === 0 ? (
            <div className="noData">Null</div>
          ) : (
            <div className="boxes-wrapper">
              {paginatedData.map((item) => (
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
      )}

      {isFiltered && (
        <div className="pagination-controls">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </button>
          <span>패이지 {currentPage} | {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            다음
          </button>
        </div>
      )}

      <Link href="/">
        <button onClick={메인페이지이동} className="navigateButton">메인 페이지</button>
      </Link>
    </div>
  );
}
