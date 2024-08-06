export interface FestivalDetail{
  id: number;
  orgName: string;
  useFee: string;
  player: string;
  orgLink: string;
  guname: string;
  mainImg: string;
  themeCode: string;
  date: string;
  etcDesc: string;
  endDate: string;
  title: string;
  codeName: string;
  userTrgt: string;
  program: string;
  startDate: string;
  place: string;
  isFree: string;
  click: number;
}


export interface Festival {
  id: number;
  mainImg: string;
  title: string;
  date: string;
  place: string;
}

export interface PaginatedResponse<T> {
  festivals: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export async function getData<T>(path: string): Promise<T> {
  const host = "http://localhost:8080";
  const url = `${host}${path}`;

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
