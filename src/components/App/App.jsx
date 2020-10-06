import React, { Component } from 'react';
import generateID from 'uuid/v4';
import { CSSTransition } from 'react-transition-group';
import styles from './App.module.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import fade from '../../transition/items.module.css';
import '../../transition/alert.css';
import '../../transition/title.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    message: '',
    showError: false,
  };

  // componentDidMount() {
  //   const notesFromLS = localStorage.getItem('contacts');
  //   if (notesFromLS) {
  //     this.setState({ contacts: JSON.parse(notesFromLS) });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { contacts } = this.state;
  //   if (prevState.contacts !== contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contactToAdd = { name, number, id: generateID() };
    const isInContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (name && number) {
      if (isInContact) {
        this.setState(() => ({
          message: `${name} is already in your contacts`,
          showError: true,
        }));
        setTimeout(() => {
          this.setState({ showError: false });
        }, 2500);
        return;
      }
      this.setState(state => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    } else {
      this.setState(() => ({
        message: `One of the fields is empty!`,
        showError: true,
      }));
      setTimeout(() => {
        this.setState({ showError: false });
      }, 2500);
    }
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, message, showError } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div>
        <CSSTransition in timeout={500} classNames="title" appear>
          <div>
            <h2 className={styles.title}>Phonebook</h2>
          </div>
        </CSSTransition>
        <CSSTransition
          in={showError}
          unmountOnExit
          timeout={300}
          classNames="alert"
        >
          <div>
            <div className={styles.error_message}>
              <p>{message}</p>
            </div>
          </div>
        </CSSTransition>
        <ContactForm onAddContact={this.addContact} />

        {contacts.length > 1 && (
          <CSSTransition timeout={250} classNames={fade}>
            <Filter value={filter} onChangeFilter={this.changeFilter} />
          </CSSTransition>
        )}
        <ContactList
          items={filteredContacts}
          onDeleteContact={this.deleteContact}
          id={generateID()}
        />
      </div>
    );
  }
}
export default App;
