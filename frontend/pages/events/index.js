import EventItem from '../../components/EventItem';
import Layout from '../../components/Layout';
import { API_URL } from '../../config';
import Pagination from '../../components/Pagination';
import { PER_PAGE } from '../../config';

export default function EventsPage({ events, page, total }) {
  let lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout title='all events'>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events available at the moment</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} id={evt.id} evt={evt.attributes || evt} />
      ))}

      <Pagination total={total} page={page} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const res = await fetch(
    `${API_URL}/api/events?populate=image&sort=date:asc&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`
  );
  let events = await res.json();

  return {
    props: {
      events: events.data,
      pagination: events.meta.pagination,
      page: events?.meta?.pagination?.page || null,
      total: events?.meta?.pagination?.total || null,
    },
  };
}
