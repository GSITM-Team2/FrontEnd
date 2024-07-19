import { IData, getData } from '../api';
import './page.css';



export default async function Page() {
  let data: IData[] = [];
 
  data = await getData<IData[]>('/data');
 
   return (
    <div className="container">
      <h1 className="heading">데이터</h1>
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
    </div>
  );
}

// Test 필요