import React, { Component } from 'react';
import generateID from 'uuid/v4';
import T from 'prop-types';
import style from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onAddContact: T.func.isRequired,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={style.contactForm}>
        <label htmlFor={generateID()}>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor={generateID()}>
          Number
          <input
            type="number"
            placeholder="Enter phone number"
            value={number}
            name="number"
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={style.formBtn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
