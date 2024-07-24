import Head from "next/head";
import styles from "./styles.module.css";

export default function bookmarklist() {
    return (
      <div className={styles.container}>
        <Head>
          <title>북마크 목록v</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.header}>
              <button className={styles.backButton}>←</button>
              <span>북마크</span>
            </div>
            <div className={styles.content}>
              <div className={styles.bookmarkHeader}>
                <h2>김○○의 북마크</h2>
              </div>
              <div className={styles.bookmarkList}>
                <div className={styles.bookmarkItem}>
                  <div className={styles.itemIcon}></div>
                  <div className={styles.itemContent}>
                    <h3>오페라 갈라</h3>
                    <p>세종대극장</p>
                    <p>2024.12.07-2024.12.17 (진행 예정)</p>
                  </div>
                </div>
                <div className={styles.bookmarkItem}>
                  <div className={styles.itemIcon}></div>
                  <div className={styles.itemContent}>
                    <h3>[마포문화재단] M 아티스트 2024 김동현 바이올린 리사이틀 II</h3>
                    <p>마포아트센터</p>
                    <p>2024.12.08-2024.12.08 (진행 예정)</p>
                  </div>
                </div>
                <div className={styles.bookmarkItem}>
                  <div className={styles.itemIcon}></div>
                  <div className={styles.itemContent}>
                    <h3>서울시립창단 송년음악회</h3>
                    <p>세종대극장</p>
                    <p>2024.12.08-2024.12.08 (진행 예정)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }
  