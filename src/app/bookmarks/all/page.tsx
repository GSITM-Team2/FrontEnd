"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import "./page.css";
import Image from "next/image";
import Link from "next/link";
import Vector from "../../../../public/img/Vector.svg";

interface Bookmark {
  id: number;
  festival: {
    id: number;
    mainImg: string;
    title: string;
    date: string;
    place: string;
  };
}

export default function Page({ params }: { params: { id: number } }) {
  const { idToken } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const fetchBookmarks = async () => {
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
      setBookmarks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [idToken]);

  const onClickDelete = async (festivalId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/bookmarks?festivalId=${festivalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            idToken: `${idToken}`,
          },
        }
      );
      if (response.ok) {
        console.log(`유저의 행사아이디:${festivalId}가 북마크에서 삭제되었습니다.`);
        fetchBookmarks();
      } else {
        console.error("Failed to delete bookmark");
      }
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <>
      <div className="bookmarks-layoutbox">
        <div>
            <header className="festival-header">
              <div className="festival-logo-container">
                <div className="festival-logo-year">
                  <div className="festival-year-background">
                    <div className="festival-year-text">2024</div>
                  </div>
                </div>
                <div className="festival-logo-text">컬쳐랜드</div>
              </div>
              <div className="gomain">
                 <Link href="/test">메인 페이지로 이동</Link>
                 </div>
            </header>
        </div>
        <div className="layoutbox">
          <div className="bookmarks-container">
            {bookmarks && bookmarks.length > 0 ? (
              <div className="bookmarks-layout">
                {bookmarks.map((b: Bookmark) => (
                  <div key={b.id} className="single-bookmark">
                    <Link href={`/festivals/${b.festival.id}`}>
                      <div className="image-container">
                        <Image
                          src={b.festival.mainImg}
                          fill
                          objectFit="cover"
                          alt="image_not_found"
                        />
                      </div>
                    </Link>
                    <div className="bookmark-description">
                      <div className="bookmark-title">{b.festival.title}</div>
                      <div className="bookmark-info">{b.festival.date}</div>
                      <div className="bookmark-info">{b.festival.place}</div>
                      <div>
                        <button
                          className="button-itself"
                          onClick={() => onClickDelete(b.festival.id)}
                          value={b.festival.id}
                        >
                          <div className="delete-button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.4"
                              stroke="currentColor"
                              className="size-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                              />
                            </svg>
                            북마크 삭제
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookmarks">
                <Image src={Vector} alt="No bookmarks" width={50} height={50} />
                <div>북마크가 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}