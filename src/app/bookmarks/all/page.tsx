"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./page.css";
import Image from "next/image";
import Link from "next/link";

interface Bookmark {
  id: number;
  festival: {
    id: number; // 호출시 id로 리턴되기때문에 여기 아이디를 id로 둘 수 밖에 없음.
    mainImg: string;
    title: string;
    date: string;
    place: string;
  };
}

export default function Page({ params }: { params: { id: number } }) {
  const { idToken } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const fetchBookmarks =
    // useEffect(() => {
    //   const fetchBookmarks
    async () => {
      if (!idToken) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/bookmarks/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            idToken: `${idToken}`,
          },
        });
        const data: Bookmark[] = await response.json();
        // console.log(data);
        setBookmarks(data);
      } catch (error) {
        console.error(error);
      }
    };
  //
  useEffect(() => {
    fetchBookmarks(); // 비동기 함수를
  }, [idToken]); // idToken이 변경될 때마다 호출한다
  // })
  const onClickDelete = async (festivalId: number) => {
    try {
      console.log(festivalId);
      const response = await fetch(
        `http://localhost:8080/bookmarks?festivalId=${festivalId}`,
        {
          // method: "PATCH",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            idToken: `${idToken}`,
          },
          body: JSON.stringify({
            // idToken: idToken,
            // festivalId: festival_id,
          }),
        }
      );
      // const data: Bookmark[] = await response.json();
      // setBookmarks(data);
      if (response.ok) {
        console.log(
          `유저의 행사아이디:${festivalId}가 북마크에서 삭제되었습니다.`
        );
        // 삭제 후 북마크 목록 다시 불러오기
        fetchBookmarks();
      } else {
        console.error("Failed to delete bookmark");
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }

    // console.log(
    //   /*${idToken}*/ `유저의 행사아이디:${params.event_id}가 북마크에서 삭제되었습니다. `
    // );
  };

  return (
    <div className="container">
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

      <div className="bookmarks-container">
        O O O 님의 북마크 리스트
        <div className="bookmarks-layout">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((b: Bookmark) => (
              <Link href={`/festivals/${b.festival.id}`}>
                <div key={b.id} className="single-bookmark">
                  <div className="image-container">
                    <Image
                      src={b.festival.mainImg}
                      layout="fill"
                      objectFit="cover"
                      alt="image_not_found"
                    />
                  </div>
                  <div className="bookmark-description">
                    <div className="bookmark-title">{b.festival.title}</div>
                    <div className="bookmark-info">{b.festival.date}</div>
                    <div className="bookmark-info">{b.festival.place}</div>
                    <div>
                      <button
                        className="button-itself"
                        onClick={() => onClickDelete(b.festival.id)}
                        value={b.festival.id}
                        // style={{ width: "40px" }}
                      >
                        <div className="delete-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.4"
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                            />
                          </svg>
                          북마크 삭제
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>북마크가 없습니다.</div> // Message when no bookmarks are available
          )}
        </div>
      </div>
    </div>
  );
}
