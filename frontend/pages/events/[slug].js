import Layout from '../../components/Layout';
import { API_URL } from '../../config';

const EventPage = ({ evt }) => {
  return (
    <Layout title='my event'>
      <h1>{evt.name}</h1>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  let events = await res.json();
  const paths = events.map((evt) => ({ params: { slug: evt.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
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
