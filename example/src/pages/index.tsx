import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// The asset is actually being imported from the 'public' dir
// You certainly don't need to keep svg assets here (you can place them inside 'src' or where ever you prefer)
// If you like the clean absolute import take a look at the example tsconfig (basePath/path fields required)
// and also next.js documentation on absolute imports/module path aliasing -> https://nextjs.org/docs/advanced-features/module-path-aliases
import src, { ReactComponent as VercelIcon } from 'svg/vercel.svg';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>next-plugin-svgr example</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://github.com/platypusrex/next-plugin-svgr">next-plugin-svgr</a>!
      </h1>

      {/* Below provides both examples of file and react component usage */}
      <div className={styles.grid}>
        <div className={styles.iconContainer}>
          <p>React component:</p>
          <VercelIcon className={styles.icon} title="vercel icon" />
        </div>
        <div className={styles.iconContainer}>
          <p>File:</p>
          <Image className={styles.img} src={src} alt="vercel icon" width="128px" height="103px" />
        </div>
      </div>
    </main>
  </div>
);

export default Home
