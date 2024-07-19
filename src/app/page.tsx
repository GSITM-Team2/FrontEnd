
import Link from 'next/link';
import { IData, getData } from '../api';
import { IData2, getData2 } from '../api';
import './page.css';

export default async function Page() {
  let data: IData[] = [];
  let data2: IData2[] = [];

  try {
    data = await getData<IData[]>('/data');
    data2 = await getData2<IData2[]>('/data/filter?guname=종로구');
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <div className="container">
      <h1 className="heading">컬쳐랜드 (모든 데이터)</h1>
      
      <div className="table-wrapper">
        <h2>Full Data</h2>
        {data.length === 0 ? (
          <div className="noData">No data available</div>
        ) : (
          <table className="simpleTable">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Organization Name</th>
                <th>Use Fee</th>
                <th>Player</th>
                <th>Game Name</th>
                <th>Theme Code</th>
                <th>Date</th>
                <th>Additional Description</th>
                <th>End Date</th>
                <th>Title</th>
                <th>Code Name</th>
                <th>User Target</th>
                <th>Program</th>
                <th>Start Date</th>
                <th>Place</th>
                <th>Is Free</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.event_id}>
                  <td>{item.event_id}</td>
                  <td>{item.org_name}</td>
                  <td>{item.use_fee}</td>
                  <td>{item.player}</td>
                  <td>{item.guname}</td>
                  <td>{item.themecode}</td>
                  <td>{item.date}</td>
                  <td>{item.etc_desc}</td>
                  <td>{item.end_date}</td>
                  <td>{item.title}</td>
                  <td>{item.codename}</td>
                  <td>{item.user_trgt}</td>
                  <td>{item.program}</td>
                  <td>{item.start_date}</td>
                  <td>{item.place}</td>
                  <td>{item.is_free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="table-wrapper">
        <h2>Filtered Data (Guname: 종로구)</h2>
        {data2.length === 0 ? (
          <div className="noData">No filtered data available</div>
        ) : (
          <table className="simpleTable">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Organization Name</th>
                <th>Use Fee</th>
                <th>Player</th>
                <th>Game Name</th>
                <th>Theme Code</th>
                <th>Date</th>
                <th>Additional Description</th>
                <th>End Date</th>
                <th>Title</th>
                <th>Code Name</th>
                <th>User Target</th>
                <th>Program</th>
                <th>Start Date</th>
                <th>Place</th>
                <th>Is Free</th>
              </tr>
            </thead>
            <tbody>
              {data2.map((item) => (
                <tr key={item.event_id}>
                  <td>{item.event_id}</td>
                  <td>{item.org_name}</td>
                  <td>{item.use_fee}</td>
                  <td>{item.player}</td>
                  <td>{item.guname}</td>
                  <td>{item.themecode}</td>
                  <td>{item.date}</td>
                  <td>{item.etc_desc}</td>
                  <td>{item.end_date}</td>
                  <td>{item.title}</td>
                  <td>{item.codename}</td>
                  <td>{item.user_trgt}</td>
                  <td>{item.program}</td>
                  <td>{item.start_date}</td>
                  <td>{item.place}</td>
                  <td>{item.is_free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link href="/new">
        <button className="navigateButton">페이지 가기</button>
      </Link>
    </div>
  );
}
