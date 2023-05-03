import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';

export default function EventsPage({ events }) {
  return (
    <Layout title='all events'>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events available at the moment</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return { props: { events }, revalidate: 1 };
}
