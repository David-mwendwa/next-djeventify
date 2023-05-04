import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';

export default function EventsPage({ events }) {
  return (
    <Layout title='all events'>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events available at the moment</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} id={evt.id} evt={evt.attributes || evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=image`);
  let events = await res.json();
  events = events.data;

  return { props: { events }, revalidate: 1 };
}
