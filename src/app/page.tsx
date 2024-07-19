import Link from "next/link";
import { IData, getData } from "../api";
import { IData2, getData2 } from "../api";
import "./page.css";
// import { getDetailData } from "./data-fetching";

export default async function Page() {
  let data: IData[] = [];
  let data2: IData2[] = [];

  try {
    data = await getData<IData[]>("/data");
    data2 = await getData2<IData2[]>("/data/filter?guname=종로구");
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // // 24.07.19
  // const details = await getDetailData("/data");
  // console.log(details);

return (
    <div className="container">
      <h1 className="heading">컬쳐랜드 (모든 데이터)</h1>

      <div className="table-wrapper">
        <h2>Full Data</h2>
        {data.length === 0 ? (
          <div className="noData">No data available</div>
        ) : (
          <div className="boxes-wrapper">
            {data.map((item) => (
              <div className="box" key={item.event_id}>
                <img src={item.main_img} alt={item.title} className="box-image" />
                <h3>{item.title}</h3>
                <p><strong>Event ID:</strong> {item.event_id}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Place:</strong> {item.place}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="table-wrapper">
        <h2>Filtered Data (Guname: 종로구)</h2>
        {data2.length === 0 ? (
          <div className="noData">No data available</div>
        ) : (
          <div className="boxes-wrapper">
            {data2.map((item) => (
              <div className="box" key={item.event_id}>
                <img src={item.main_img} alt={item.title} className="box-image" />
                <h3>{item.title}</h3>
                <p><strong>Event ID:</strong> {item.event_id}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Place:</strong> {item.place}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/new">
        <button className="navigateButton">페이지 가기</button>
      </Link>
    </div>
  );
}

