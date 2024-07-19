"use client";

import { getDetailData } from "@/app/data-fetching";
import tokenInfo from "../../signin/tokenInfo";

export default async function Page({
  params,
}: {
  params: { event_id: string };
}) {
  const details = await getDetailData(`/data/${params.event_id}`);
  console.log(params);
  const onClick = async () => {
    await fetch("http://localhost:8080/bookmark/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: params.event_id,
        /*  여기에 이제 토큰 받아오면돼요  */
        // idToken:(Signin.getAuth()
        // .verifyIdToken(idToken)
        // .then((decodedToken) => {
        //   const uid = decodedToken.uid;
        //   // ...
        // })
        // .catch((error) => {
        //   // Handle error
        // });),

        // 여기 밑에 email,nickname,password는 선생님이 코드 임시로 짜준거라 필요없는데 참고용으로 놔둔겁니다.
        // email: "xxxaaa@gmail.com",
        // nickname: "테스트유저",
        // password: "afsdf123",
        idToken : (tokenInfo)
      }),
    });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div>/data/{params.event_id}입니다</div>

      <div className="font-semibold">
        <div>
          <div className="flex">
            <img
              src={details.main_img}
              width="200"
              height="200"
              alt="image_not_found"
            />

            <div className="flex flex-col gap-8">
              <div>
                [{details.guname}] {details.title}
              </div>
              <div>{details.date}</div>
              <div>{details.place}</div>
              <div>{details.user_trgt}</div>
              <div>{details.use_fee}</div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <button
            className="bg-blue-400 text-white font-semibold text-xl rounded-md active:bg-blue-500 active:scale-95 p-2"
            onClick={onClick}
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
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
