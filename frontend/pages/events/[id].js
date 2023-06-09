import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import styles from '../../styles/Event.module.css';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const EventPage = ({ evt }) => {
  const router = useRouter();
  evt = evt?.attributes;
  const imageFormats = evt?.image?.data?.attributes?.formats;

  const handleDelete = async (e) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/api/events/${router.query.id}`);
        router.push('/events');
      } catch (error) {
        toast.error(error.response.data.error.message);
      }
    }
  };

  return (
    <Layout title='event'>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link
            href={`/events/edit/${evt.id || router.query.id}`}
            className={styles.edit}>
            <FaPencilAlt /> Edit
          </Link>
          <a href='#' className={styles.delete} onClick={handleDelete}>
            <FaTimes /> Delete
          </a>
        </div>

        <span>
          {moment(evt?.date).format('DD MMM YYYY')} at {evt?.time}
        </span>
        <h1>{evt?.name}</h1>
        <ToastContainer />
        {evt?.image && (
          <div className={styles.image}>
            <Image
              src={imageFormats?.thumbnail?.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers: </h3>
        <p>{evt?.performers}</p>
        <h3>Description</h3>
        <p>{evt?.description}</p>
        <h3>Venue: {evt?.venue}</h3>
        <p>{evt?.address}</p>
        <Link href='/events' className={styles.back}>
          <BsArrowLeft /> Go Back
        </Link>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);
  let event = await res.json();
  return {
    props: { evt: event.data },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   let events = await res.json();
//   events = events.data;
//   console.log('eventsss', events);
//   const paths = events.map((evt) => ({
//     params: { id: evt?.id },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// // TODO: fix this to get id
// export async function getStaticProps(params) {
//   console.log(params);
//   const res = await fetch(`${API_URL}/api/events/${params.id}`);
//   let event = await res.json();
//   event = event.data;
//   return {
//     props: { evt: event },
//     revalidate: 1,
//   };
// }

export default EventPage;
