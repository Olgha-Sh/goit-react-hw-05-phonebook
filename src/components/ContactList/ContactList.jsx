import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import T from 'prop-types';
import ContactItem from '../ContactItem/ContactItem';
import style from './ContactList.module.css';
import transition from '../../transition/items.module.css';

const ContactList = ({ items, onDeleteContact }) => {
  return (
    <TransitionGroup component="ul" className={style.contactList}>
      {items.map(el => (
        <CSSTransition key={el.id} timeout={250} classNames={transition}>
          <li className={style.contactItem}>
            <ContactItem
              name={el.name}
              number={el.number}
              onDeleteContact={() => onDeleteContact(el.id)}
            />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
ContactList.defaultProps = {
  items: [],
};
ContactList.propTypes = {
  items: T.arrayOf(
    T.shape({
      name: T.string,
      number: T.string,
    }),
  ),
  onDeleteContact: T.func.isRequired,
};
export default ContactList;
