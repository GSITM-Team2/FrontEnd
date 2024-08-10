"use client";
import React, { useEffect, useState, useRef } from "react";
import "./test.css";
import search from "../../../public/img/search.png";
import Image from "next/image";
import toggle_active from "../../../public/img/toggle_active.svg";
import noImage from "../../../public/img/noImage.png";
import calendaer from "../../../public/img/calender.svg";
import placeIcon from "../../../public/img/placeIcon.svg";
import { Festival, getData } from "@/api";

interface PaginatedResponse<T> {
  festivals: T[];
  totalPages: number;
  totalCount: number;
}

interface FestivalSearchParam {
  codename?: string;
  guname?: string;
  pageNumber: number;
  pageSize: number;
}

export default function TestPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [theme, setTheme] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const PER_PAGE = 12;

  const fetchFestivals = async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params: FestivalSearchParam = {
        codename: theme !== "테마" ? theme : undefined,
        guname: place !== "장소" ? place : undefined,
        pageNumber: pageNum + 1, // 백엔드에 1부터 시작하는 페이지 번호 전송
        pageSize: PER_PAGE,
      };

      const queryString = new URLSearchParams(params as any).toString();
      const data = await getData<PaginatedResponse<Festival>>(
        `/festivals/filter?${queryString}`
      );

      setFestivals((prevFestivals) =>
        pageNum === 0 ? data.festivals : [...prevFestivals, ...data.festivals]
      );
      setPage(pageNum);
      setHasMore(data.festivals.length === PER_PAGE);
    } catch (error) {
      console.error("Failed to fetch festivals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setFestivals([]);
    fetchFestivals(0);
  }, [theme, place]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 0) {
      fetchFestivals(page);
    }
  }, [page]);

  return (
    <div className="container">
      <div className="logo-container">
        <div className="logo-year">
          <div className="year-background">
            <div className="year-text">2024</div>
          </div>
        </div>
        <div className="logo-text">컬쳐랜드</div>
      </div>
      <div className="container-buttons">
        <div className="button-container">
          <div className="theme-button">
            <form action="#">
              <select
                style={{ textAlign: "center", backgroundColor: "transparent" }}
                name="theme"
                id="code_name"
                onChange={(e) => {
                  setTheme(e.target.value);
                  setPage(0);
                  setFestivals([]);
                  setHasMore(true);
                }}
              >
                <option>테마</option>
                <option value="뮤지컬/오페라">뮤지컬/오페라</option>
                <option value="클래식">클래식</option>
                <option value="전시/미술">전시/미술</option>
                <option value="국악">국악</option>
                <option value="연극">연극</option>
                <option value="무용">무용</option>
                <option value="교육/체험">교육/체험</option>
                <option value="콘서트">콘서트</option>
                <option value="독주/독창회">독주/독창회</option>
                <option value="영화">영화</option>
                <option value="축제-문화/예술">축제-문화/예술</option>
                <option value="축제-전통/역사">축제-전통/역사</option>
                <option value="축제-시민화합">축제-시민화합</option>
                <option value="축제-자연/경관">축제-자연/경관</option>
                <option value="축제-기타">축제-기타</option>
                <option value="기타">기타</option>
              </select>
            </form>
          </div>

          <div className="place-button">
            <form action="#">
              <select
                style={{ textAlign: "center" }}
                name="place"
                id="guname"
                onChange={(e) => {
                  setPlace(e.target.value);
                  setPage(0);
                  setFestivals([]);
                  setHasMore(true);
                }}
              >
                <option>장소</option>
                <option value="강남구">강남구</option>
                <option value="종로구">종로구</option>
                <option value="강동구">강동구</option>
                <option value="강북구">강북구</option>
                <option value="강서구">강서구</option>
                <option value="관악구">관악구</option>
                <option value="광진구">광진구</option>
                <option value="구로구">구로구</option>
                <option value="금천구">금천구</option>
                <option value="노원구">노원구</option>
                <option value="도봉구">도봉구</option>
                <option value="동대문구">동대문구</option>
                <option value="동작구">동작구</option>
                <option value="마포구">마포구</option>
                <option value="서대문구">서대문구</option>
                <option value="서초구">서초구</option>
                <option value="성동구">성동구</option>
                <option value="성북구">성북구</option>
                <option value="송파구">송파구</option>
                <option value="양천구">양천구</option>
                <option value="영등포구">영등포구</option>
                <option value="용산구">용산구</option>
                <option value="은평구">은평구</option>
                <option value="중구">중구</option>
                <option value="중랑구">중랑구</option>
              </select>
            </form>
          </div>

          <div className="search-layout">
            <div className="search-bar">
              <input
                className="search-placeholder"
                type="text"
                placeholder="서울에 있는 모든 문화 행사 공연 정보를 검색해보세요"
              ></input>
            </div>
            <span>
              <button>
                <Image src={search} alt="" width={28} height={28} />
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="toggle_layout">
        <button className="my-bookmark">🔖북마크 보기</button>
        <div className="toggle-content">
          <Image src={toggle_active} alt="" width={51.82} height={27.8} />
          <span>&nbsp;&nbsp;진행중</span>
        </div>
      </div>

      <div className="top-title">🔥 컬쳐랜드 인기순위 TOP5 🔥</div>
      <div className="popular-overlay">
        <div className="popular-info">
          <div className="festival-component">
            <Image src={noImage} alt="" width={285} height={285} />
            <b>Title입니다</b>
            <div style={{ display: "inline-flex" }}>
              <Image src={calendaer} alt="" width={13} height={12} />
              <span>&nbsp;2012-10-20~2020-10-20</span>
            </div>
            <div style={{ display: "inline-flex" }}>
              <Image src={placeIcon} alt="" width={12} height={15} />
              <span>&nbsp;강남어쩌구저쩌구아트홀</span>
            </div>
          </div>
        </div>
      </div>

      <div className="top-title">🔎 서울에 있는 모든 행사 찾기 🔎</div>
      <div className="festival-container">
        <div className="festival-layout">
          {festivals.map((festival) => (
            <div key={festival.id} className="festival-component">
              <a href={`/festivals/${festival.id}`}>
                <div className="festival-image-container">
                  <Image
                    src={festival.mainImg || noImage}
                    alt={festival.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="festival-info">
                  <div className="festival-title" title={festival.title}>
                    {festival.title}
                  </div>
                  <div className="festival-detail">
                    <Image src={calendaer} alt="" width={13} height={12} />
                    <span>{festival.date}</span>
                  </div>
                  <div className="festival-detail">
                    <Image src={placeIcon} alt="" width={12} height={15} />
                    <div className="festival-place" title={festival.place}>
                      {festival.place}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        {!loading && !hasMore && festivals.length > 0 && (
          <div className="end-message">마지막 페이지 입니다</div>
        )}
        {!loading && festivals.length === 0 && (
          <div className="no-results">검색 결과가 없습니다</div>
        )}
        <div ref={observerRef} style={{ height: "20px" }} />
      </div>
    </div>
  );
}
