"use client";

import { useEffect, useState } from "react"; 
import { getDetailData } from "@/app/data-fetching";
import { useAuth } from '../../../context/AuthContext'; 

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
                id: Number(params.id)
            }),
        });
        console.log({idToken});
    };

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div>/data/{params.id}입니다</div>

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
                        value={params.id}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
