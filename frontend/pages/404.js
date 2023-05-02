import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';

const NotFoundPage = () => {
  return (
    <Layout title='Not Found'>
      <div className={styles.error}>
        <h1>
          {' '}
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, this page is not found</h4>
        <Link href='/'>Go to homepage</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
