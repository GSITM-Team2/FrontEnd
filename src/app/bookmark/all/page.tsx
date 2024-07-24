"use client";

import { useEffect, useState } from "react"; 
import { useAuth } from '../../../context/AuthContext'; 

interface Bookmark {
  id: number;
  main_img: string;
  title: string;
  date: string;
  place: string;
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  const { idToken } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!idToken) {
        console.error("User not authenticated");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/bookmark/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "idToken": idToken, 
          },
        });
        const data: Bookmark[] = await response.json();
        setBookmarks(data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookmarks(); // 비동기 함수를
  }, [idToken]); // idToken이 변경될 때마다 호출한다 

  return (
    <div className="min-h-screen flex flex-col">
      <div>저장된 북마크 리스트 조회 페이지 입니다.</div>

      <div className="font-semibold">
        <div className="flex flex-col gap-8">
          {bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((b: Bookmark) => (
              <div key={b.id} className="flex">
                <img
                  src={b.main_img}
                  width="200"
                  height="200"
                  alt="image_not_found"
                />
                <div className="flex flex-col ml-4">
                  <div>{b.title}</div>
                  <div>{b.date}</div>
                  <div>{b.place}</div>
                </div>
              </div>
            ))
          ) : (
            <div>북마크가 없습니다.</div> // Message when no bookmarks are available
          )}
        </div>
      </div>
    </div>
  );
}
