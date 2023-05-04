import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/EventItem.module.css';
import moment from 'moment';

const EventItem = ({id, evt }) => {
  const imageFormats = evt.image?.data?.attributes?.formats;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            imageFormats
              ? imageFormats.thumbnail?.url
              : '/images/event-default.png'
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {moment(evt.date).format('DD MMM YYYY')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/events/${id}`} className='btn'>
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
