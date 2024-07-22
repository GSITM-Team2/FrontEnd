"use client";

import { getDetailData } from "../../data-fetching";

export default async function Page({
  params,
}: {
  params: { id: string }; /*bookmark id */
}) {
  const details = await getDetailData("/bookmark/showbookmarks");
  console.log(details);

  return (
    <div className="min-h-screen flex flex-col">
      <div>저장된 북마크 리스트 조회 페이지 입니다.</div>

      <div className="font-semibold">
        <div className="flex flex-col gap-8">
          {details && details.length > 0 ? (
            details.map((b) => (
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