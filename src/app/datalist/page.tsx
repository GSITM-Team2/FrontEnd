import Head from "next/head";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>오페라 갈라</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.header}>
            <button className={styles.backButton}>←</button>
            <span>목록</span>
            <button className={styles.menuButton}>☰</button>
          </div>
          <div className={styles.content}>
            <div className={styles.imageContainer}>
              <div className={styles.placeholder}></div>
            </div>
            <h2 className={styles.title}>[종로구] 오페라 갈라</h2>
            <p className={styles.date}>2024.12.07-2024.12.17</p>
            <p className={styles.location}>세종대극장</p>
            <p className={styles.description}>
              7세이상 관람가능(2017년생부터 관람가능)
            </p>
            <p className={styles.price}>일반석 120,000원 / VIP 140,000원</p>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>홈페이지연결</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
