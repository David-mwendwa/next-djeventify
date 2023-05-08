import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { API_URL } from '../../../config/index';
import styles from '../../../styles/Form.module.css';
import useInput from '../../../utils/useInput';
import { BsArrowLeft } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image';

const EditEventPage = ({ evt }) => {
  let id = evt.id;
  evt = evt.attributes;
  const { values, handleChange, resetValues } = useInput({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt?.image?.data?.attributes?.formats?.thumbnail?.url || null
  );

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${API_URL}/api/events/${id}`, {
        data: { ...values },
      });
      router.push(`/events/${data.data.id}`);
      toast.success('Event updated');
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <Layout title='add new event'>
      <Link href='/events'>
        <BsArrowLeft /> Go Back
      </Link>
      <ToastContainer />
      <h1>Edit Event</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              required
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              required
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              required
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              required
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input
              required
              type='date'
              name='date'
              id='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input
              required
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Event Description</label>
          <textarea
            required
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleChange}></textarea>
        </div>

        <input type='submit' value='Update Event' className='btn' />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image updated</p>
        </div>
      )}
      <div>
        <button className='btn-secondary'>
          <FaImage /> Set Image
        </button>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=image`);

  const evt = await res.json();

  return { props: { evt: evt.data } };
}

export default EditEventPage;
