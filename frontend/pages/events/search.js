import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { API_URL } from '../../config';
import EventItem from '../../components/EventItem';
import Link from 'next/link';
import axios from 'axios';
import qs from 'qs';
import { BsArrowLeft } from 'react-icons/bs';

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title='search results'>
      <Link href='/events'>
        <BsArrowLeft /> Go Back
      </Link>
      <h1>Search Results for {router.query.term}</h1>
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

export async function getServerSideProps({ query: { term } }) {
  // TODO: use a query string
  let query = qs.stringify({});
  const res = await fetch(
    `${API_URL}/api/events?populate=image&filters[name][$contains]=${term}`
  );
  const events = await res.json();

  return { props: { events: events.data } };
}
