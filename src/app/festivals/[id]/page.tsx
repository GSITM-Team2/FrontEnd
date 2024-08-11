"use client";

import { useEffect, useState } from "react";
import "./page.css";
import Link from "next/link";
import { getDetailData } from "@/app/data-fetching";
import { useAuth } from "../../../context/AuthContext";
import search from "../../../public/img/search.png";

export default function Page({ params }: { params: { id: string } }) {
  const { idToken } = useAuth();
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDetails = await getDetailData(`/festivals/${params.id}`);
      setDetails(fetchedDetails);
    };
    fetchData();
  }, [params.id]);

  const onClick = async () => {
    await fetch("http://localhost:8080/bookmarks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
        id: Number(params.id),
      }),
    });
    console.log({ idToken });
  };
  const onClickGoHome = async () => {
    await fetch("http://localhost:8080/test");
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* <div>/festivals/{params.id}입니다</div> */}
      <div className="topbarcontainer">
        <div className="logocontainer">
          <img src="/img/culturelandlogo.png" alt="" width={105} height={28} />
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
              <img src="/img/search.png" alt="" width={28} height={28} />
            </button>
          </span>
        </div>
      </div>

      <div className="festival-detail-container">
        <div>
          <div>
            <div className="festival-align">
              <div className="festival-info-container">
                <div className="festival-title">{details.title}</div>
                <div>{details.codename}</div>
                <div>{details.date}</div>
                <div>{details.orgName}</div>
                <div>서울특별시 {details.guname}</div>
                <div>{details.place}</div>
                <div>
                  <br />
                </div>
                <div>{details.user_trgt}</div>
                <div>{details.use_fee}</div>
              </div>
              <div className="festival-image-container">
                <img src={details.main_img} alt="image_not_found" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <button className="button-main" onClick={onClick} value={params.id}>
            <div className="bookmark-text">북마크 저장하기</div>
            <div className="bookmark-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="23"
                viewBox="0 0 19 23"
                fill="none"
              >
                <mask id="path-1-inside-1_162_18" fill="white">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19 1.5C19 0.671573 18.3284 0 17.5 0H1.5C0.671573 0 0 0.671575 0 1.5V20.7024C0 21.9471 1.42863 22.6503 2.41499 21.891L8.44127 17.252C8.98061 16.8368 9.7319 16.8368 10.2712 17.252L16.585 22.1123C17.5714 22.8716 19 22.1684 19 20.9237V1.5Z"
                  />
                </mask>
                <path
                  d="M16.585 22.1123L17.805 20.5275L16.585 22.1123ZM8.44127 17.252L7.22128 15.6671L8.44127 17.252ZM10.2712 17.252L9.05126 18.8368L10.2712 17.252ZM2.41499 21.891L3.63497 23.4758L2.41499 21.891ZM1.5 2H17.5V-2H1.5V2ZM2 20.7024V1.5H-2V20.7024H2ZM3.63497 23.4758L9.66125 18.8368L7.22128 15.6671L1.195 20.3062L3.63497 23.4758ZM9.05126 18.8368L15.365 23.6971L17.805 20.5275L11.4912 15.6671L9.05126 18.8368ZM17 1.5V20.9237H21V1.5H17ZM15.365 23.6971C17.6665 25.4688 21 23.8281 21 20.9237H17C17 20.5088 17.4762 20.2744 17.805 20.5275L15.365 23.6971ZM9.66125 18.8368C9.48147 18.9752 9.23104 18.9752 9.05126 18.8368L11.4912 15.6671C10.2328 14.6984 8.47975 14.6984 7.22128 15.6671L9.66125 18.8368ZM-2 20.7024C-2 23.6068 1.33348 25.2475 3.63497 23.4758L1.195 20.3062C1.52379 20.0531 2 20.2874 2 20.7024H-2ZM17.5 2C17.2239 2 17 1.77614 17 1.5H21C21 -0.432997 19.433 -2 17.5 -2V2ZM1.5 -2C-0.433 -2 -2 -0.432992 -2 1.5H2C2 1.77614 1.77615 2 1.5 2V-2Z"
                  fill="#FFFAFA"
                  mask="url(#path-1-inside-1_162_18)"
                />
              </svg>
            </div>
          </button>
          <Link href="/test">
          <button className="button-goto-homepage" onClick={onClickGoHome}>
            홈페이지 바로가기
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
