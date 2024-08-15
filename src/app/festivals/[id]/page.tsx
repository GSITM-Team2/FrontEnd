"use client";

import { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import { getDetailData } from "@/app/data-fetching";
import { useAuth } from "../../../context/AuthContext";
import Image from 'next/image';

export default function Page({ params }: { params: { id: number } }) {
  const { idToken } = useAuth();
  const [details, setDetails] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDetails = await getDetailData(`/festivals/${params.id}`);
      setDetails(fetchedDetails);
    };
    fetchData();
  }, [params.id]);

  const toggleBookmark = async () => {
    if (!idToken) {
      alert("로그인이 필요한 기능입니다. 로그인 해주세요.");
      return;
    }
  
    try {
      const url = `http://localhost:8080/bookmarks?festivalId=${params.id}`;
      const method = isBookmarked ? "DELETE" : "POST";
      
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "idToken": idToken
      };
  
      console.log("Sending request:", { url, method, headers });
  
      const response = await fetch(url, {
        method: method,
        headers: headers,
      });
  
      console.log("Response status:", response.status);
      const responseBody = await response.text();
      console.log("Response body:", responseBody);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseBody}`);
      }
  
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error :", error);
      alert("북마크 처리 중 오류가 발생했습니다.");
    }
  };

  const onClickGoHome = async () => {
    await fetch("http://localhost:8080/test");
  };

  if (!details) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
    <div className="layout">
      <Link href="/test">
        <header className="festival-header">
          <div className="festival-logo-container">
            <div className="festival-logo-year">
              <div className="festival-year-background">
                <div className="festival-year-text">2024</div>
              </div>
            </div>
            <div className="festival-logo-text">컬쳐랜드</div>
          </div>
        </header>
      </Link>
      <div className="h-container">
        <div className="festival-detail-main">
          <h1 className="festival-detail-title">{details.title}</h1>
          
          <div className="festival-detail-content">
            <div className="festival-detail-image-container">
              <img src={details.main_img} alt={details.title} className="festival-detail-image" />
            </div>
            
            <div className="festival-detail-info">
              <div className="festival-detail-section">
                <h2>행사 정보</h2>
                <div className="festival-detail-item"><strong>카테고리:</strong> {details.codename}</div>
                <div className="festival-detail-item"><strong>진행기간:</strong> {details.date}</div>
                <div className="festival-detail-item"><strong>주최:</strong> {details.orgName}</div>
              </div>
              
              <div className="festival-detail-section">
                <h2>위치 및 대상</h2>
                <div className="festival-detail-item"><strong>위치:</strong> 서울특별시 {details.guname}</div>
                <div className="festival-detail-item"><strong>장소:</strong> {details.place}</div>
                <div className="festival-detail-item"><strong>대상:</strong> {details.user_trgt}</div>
              </div>
              
              <div className="festival-detail-section">
                <h2>이용 정보</h2>
                <div className="festival-detail-item"><strong>이용료:</strong> {details.use_fee}</div>
              </div>
              
              <div className="festival-detail-button-container">
                <button className="festival-detail-button-main" onClick={toggleBookmark}>
                  <span className="festival-detail-bookmark-text">북마크 {isBookmarked ? '삭제' : '저장'}</span>
                  <span className="festival-detail-bookmark-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" 
                        fill={isBookmarked ? "currentColor" : "none"} 
                        stroke="currentColor" 
                        strokeWidth="2"/>
                    </svg>
                  </span>
                </button>
                <Link href="/test">
                  <button className="festival-detail-button-homepage" onClick={onClickGoHome}>
                    <span className="festival-detail-globe-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="16" height="16">
                        <path fill="currentColor" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.6-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/>
                    </svg>
                  </span>
                  홈페이지 바로가기
                </button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}