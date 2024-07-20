import Link from "next/link";
import { IData, getData } from "../api";
import { IData2, getData2 } from "../api";
import "./page.css";
import { getDetailData } from "./data-fetching";

export default async function Page() {
  let data: IData[] = [];
  let data2: IData2[] = [];

  try {
    data = await getData<IData[]>("/data");
    data2 = await getData2<IData2[]>("/data/filter?guname=종로구");
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  //24.07.19
  const details = await getDetailData("/data");
  console.log(details);

  return (
    <div className="container">
      <h1 className="heading">컬쳐랜드 (모든 데이터)</h1>

      <div className="table-wrapper">
        <h2>Full Data</h2>
        {data.length === 0 ? (
          <div className="noData">Null</div>
        ) : (
          <table className="simpleTable">
            <thead>
              <tr>
                {/* <th>Event ID</th> */}
                {/* <th>Organization Name</th> */}
                {/* <th>Use Fee</th> */}
                {/* <th>Player</th> */}
                {/* <th>Game Name</th> */}
                {/* <th>Theme Code</th> */}
                <th>Title</th>
                <th>Date</th>
                <th>Place</th>
                <th>main_img</th>

                {/* <th>Additional Description</th> */}
                {/* <th>End Date</th> */}
                {/* <th>Code Name</th> */}
                {/* <th>User Target</th> */}
                {/* <th>Program</th> */}
                {/* <th>Start Date</th> */}
                {/* <th>Is Free</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.event_id}>
                  {/* <td>{item.event_id}</td> */}
                  {/* <td>{item.org_name}</td> */}
                  {/* <td>{item.use_fee}</td> */}
                  {/* <td>{item.player}</td> */}
                  {/* <td>{item.guname}</td> */}
                  {/* <td>{item.themecode}</td> */}
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td>{item.place}</td>
                  <td>
                    <img src={item.main_img} alt="" />
                  </td>
                  {/* <td>{item.etc_desc}</td> */}
                  {/* <td>{item.end_date}</td> */}
                  {/* <td>{item.codename}</td> */}
                  {/* <td>{item.user_trgt}</td> */}
                  {/* <td>{item.program}</td> */}
                  {/* <td>{item.start_date}</td> */}
                  {/* <td>{item.is_free}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-wrapper">
        <h2>Filtered Data (Guname: 종로구)</h2>
        {data2.length === 0 ? (
          <div className="noData">Null</div>
        ) : (
          <table className="simpleTable" style={{tableLayout:'fixed'}}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Place</th>
                <th>main_img</th>
                {/* <th>Event ID</th> */}
                {/* <th>Organization Name</th> */}
                {/* <th>Use Fee</th> */}
                {/* <th>Player</th> */}
                {/* <th>Game Name</th> */}
                {/* <th>Theme Code</th> */}
                {/* <th>Date</th> */}
                {/* <th>Additional Description</th> */}
                {/* <th>End Date</th> */}
                {/* <th>Code Name</th> */}
                {/* <th>User Target</th> */}
                {/* <th>Program</th> */}
                {/* <th>Start Date</th> */}
                {/* <th>Is Free</th> */}
              </tr>
            </thead>
            <tbody>
              {data2.map((item) => (
                <tr key={item.event_id}>
                  <td>{item.title}</td>
                  <td>{item.date}</td>
                  <td>{item.place}</td>
                  <td>
                    <img src={item.main_img} alt="" />
                  </td>
                  {/* <td>{item.event_id}</td>
                  <td>{item.org_name}</td>
                  <td>{item.use_fee}</td>
                  <td>{item.player}</td>
                  <td>{item.guname}</td>
                  <td>{item.themecode}</td>
                  <td>{item.etc_desc}</td>
                  <td>{item.end_date}</td>
                  <td>{item.title}</td>
                  <td>{item.codename}</td>
                  <td>{item.user_trgt}</td>
                  <td>{item.program}</td>
                  <td>{item.start_date}</td>
                  <td>{item.place}</td>
                  <td>{item.is_free}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link href="/new">
        <button className="navigateButton">페이지 가기</button>
      </Link>

      {/* 24.07.19 
      이 밑에 div는 임시로 번호(event_id)를 클릭하면 
      상세조회페이지로 넘어가게끔 만든것입니다.*/}
      <div>
        <div className="font-semibold">상세조회 페이지</div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4">
            <a href="">목록</a>
            {/* .slice(0,10) 데이터가 너무 많이나와서
          10개만 나오게끔 임시로 조정해놓았습니다.  */}
            {details.slice(0, 10).map((d) => (
              <a href={`/data/${d.event_id}`}>
                <div>{d.event_id}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
