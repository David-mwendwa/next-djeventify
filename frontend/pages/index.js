import EventItem from '../components/EventItem';
import Layout from '../components/Layout';
import { API_URL } from '../config';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function HomePage({ events }) {
  return (
    <Layout>
      <ToastContainer />
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events available at the moment</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} id={evt.id} evt={evt.attributes || evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events' className='btn-secondary'>
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?populate=image&_sort=date:ASC&_limit=3`
  );
  const events = await res.json();

  return { props: { events: events.data }, revalidate: 1 };
}
