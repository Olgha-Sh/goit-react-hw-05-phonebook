import React from 'react';
import T from 'prop-types';
import style from './ContactItem.module.css';

const ContactItem = ({ name, number, onDeleteContact }) => {
  return (
    <div className={style.contactItem}>
      <p className={style.contact_name}>Contact:{name}</p>
      <p className={style.contact_number}>{number}</p>
      <button type="button" onClick={onDeleteContact} className={style.listBtn}>
        &#10008;
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  name: T.string.isRequired,
  number: T.string.isRequired,
  onDeleteContact: T.func.isRequired,
};

export default ContactItem;
