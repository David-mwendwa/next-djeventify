import Head from 'next/head';
import styles from '../styles/Layout.module.css';

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{`DJEventify | ${title}`}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

Layout.defaultProps = {
  title: 'DJEventify | Find the hottest parties',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, edm, events',
};

export default Layout;
