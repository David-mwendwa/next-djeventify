import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { API_URL } from '../../config/index';
import styles from '../../styles/Form.module.css';
import useInput from '../../utils/useInput';
import { BsArrowLeft } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddEventPage = () => {
  const { values, handleChange, resetValues } = useInput({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${API_URL}/api/events`, {
        data: { ...values },
      });
      router.push(`/events/${data.data.id}`);
      toast.success('Added a new event');
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
      <h1>Add Event</h1>

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
              value={values.date}
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

        <input type='submit' value='Add Event' className='btn' />
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default AddEventPage;
