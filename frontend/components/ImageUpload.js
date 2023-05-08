import React, { useState } from 'react';
import { API_URL } from '../config';
import styles from '../styles/Form.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import useInput from '../utils/useInput';

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  // TODO: make this work
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('files', image);
    formData.append('ref', 'events');
    formData.append('refId', evtId);
    formData.append('field', 'image');

    // try {
    //   const { data } = await axios.post(`${API_URL}/upload`, {
    //     data: formData,
    //   });

    //   console.log({ data });
    // } catch (error) {
    //   toast.error(error.response.data.error.message);
    // }

    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
}
