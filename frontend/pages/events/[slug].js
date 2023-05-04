import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/Event.module.css';
import moment from 'moment';

const EventPage = ({ evt }) => {
  let evtId = evt.id;
  evt = evt.attributes;

  const handleDelete = (e) => {
    console.log('delete');
  };
  return (
    <Layout title='event'>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evtId}`} className={styles.edit}>
            <FaPencilAlt /> Edit
          </Link>
          <a href='#' className={styles.delete} onClick={handleDelete}>
            <FaTimes /> Delete
          </a>
        </div>

        <span>
          {moment(evt.date).format('DD MMM YYYY')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image?.format?.thumbnail}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers: </h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href='/events' className={styles.back}>
          <BsArrowLeft /> Go Back
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  let events = await res.json();
  events = events.data;
  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug || evt.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?slug=${slug}`);
  let events = await res.json();
  events = events.data;
  return {
    props: { evt: events[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();
//   return {
//     props: { evt: events[0] },
//   };
// }

export default EventPage;
