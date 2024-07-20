export interface IData {
  event_id: number;
  org_name: string;
  use_fee: string;
  player: string;
  org_link: string;
  guname: string;
  main_img: string;
  themecode: string;
  date: string;
  etc_desc: string;
  end_date: string;
  title: string;
  codename: string;
  user_trgt: string;
  program: string;
  start_date: string;
  place: string;
  is_free: string;
}

export interface IData2 {
  event_id: number;
  org_name: string;
  use_fee: string;
  player: string;
  org_link: string;
  guname: string;
  main_img: string;
  themecode: string;
  date: string;
  etc_desc: string;
  end_date: string;
  title: string;
  codename: string;
  user_trgt: string;
  program: string;
  start_date: string;
  place: string;
  is_free: string;
}

export interface IData3 {
  event_id: number;
  org_name: string;
  use_fee: string;
  player: string;
  org_link: string;
  guname: string;
  main_img: string;
  themecode: string;
  date: string;
  etc_desc: string;
  end_date: string;
  title: string;
  codename: string;
  user_trgt: string;
  program: string;
  start_date: string;
  place: string;
  is_free: string;
}



export async function getData<T>(path: string): Promise<T> {
  const host = "http://localhost:8080";
  const url = `${host}${path}?t=${new Date().getTime()}`;

  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error('Null');
  }

  return response.json();
}

export async function getData2<T>(path: string): Promise<T> {
  const host = "http://localhost:8080";
  const response = await fetch(`${host}${path}`);
  if (!response.ok) {
    throw new Error('Null');
  }
  return response.json();
}
