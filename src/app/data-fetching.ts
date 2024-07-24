// 24.07.19
export async function getDetailData(path: string) {
    const hostname = "http://localhost:8080";
    const url = `${hostname}${path}`;
    const response = await fetch(url, { cache: "no-store" });
    return response.json();
  }
  