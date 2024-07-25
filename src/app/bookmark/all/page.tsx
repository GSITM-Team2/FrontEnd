"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

interface Bookmark {
  id: number;
  main_img: string;
  title: string;
  date: string;
  place: string;
  event_id: number;
}

export default function Page({ params }: { params: { id: string } }) {
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
        const response = await fetch("http://localhost:8080/bookmark/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            idToken: idToken,
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
  const onClickDelete = async (event_id: number) => {
    try {
      console.log(event_id);
      const response = await fetch("http://localhost:8080/bookmark/", {
        // method: "PATCH",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
          eventId: event_id,
        }),
      });
      // const data: Bookmark[] = await response.json();
      // setBookmarks(data);
      if (response.ok) {
        console.log(
          `유저의 행사아이디:${event_id}가 북마크에서 삭제되었습니다.`
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
                  <button
                    className="bg-blue-400 text-white font-semibold text-xl rounded-md active:bg-blue-500 active:scale-95 p-2"
                    onClick={() => onClickDelete(b.event_id)}
                    value={b.event_id}
                    style={{ width: "40px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                      />
                    </svg>
                  </button>
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
