import React, { Component } from 'react'
import update from 'immutability-helper'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.min.css'
import moment from 'moment'
const EMAIL_VALIDATION_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default class Form extends Component {

    constructor (props) {
        super(props);
        this.state = {
            user: this.props.user,
            errors: {},
            startDate: moment(),

        };
        this.changeInput = this.changeInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this)
    }

    validateForm() {
        this.setState({formValid:

            this.state.user.email
            && this.state.user.name
            && this.state.user.phone
            && this.state.user.address
            && this.state.user.date
            && this.state.errors
            && !this.state.errors.nameError
            && !this.state.errors.postcodeError
            && !this.state.errors.addressError
            && !this.state.errors.emailError
            && !this.state.errors.phoneError
            && !this.state.errors.dateError

        });
        console.log(this.state.errors)
    }

    changeInput ({target: {value, name}}) {

        let errorMass = this.state.errors;
        let emailValue = false;

        if (name === 'name') {
            errorMass.nameError = '';

            if (value.length <= 4) {
                errorMass.nameError = 'required';
                this.setState.errors =errorMass.nameError = 'required'
            }

        }

        if (name === 'email') {
            errorMass.emailError = '';
            if (value.length <= 0) {
                errorMass.emailError = 'required'

            } else {
                emailValue = EMAIL_VALIDATION_REGEX.test(value)
            }
            if (!emailValue) {
                errorMass.emailError = 'must contain @'
            }

        }
        if (name === 'phone') {
            errorMass.phoneError = '';
            if (value.length <= 0) {
                errorMass.phoneError = 'required'
            }

        }
        if (name === 'postcode') {
            errorMass.postcodeError = '';
            if (value.length <= 0) {
                errorMass.postcodeError = 'required'
            }
             else if (value.length <= 5) {
                errorMass.postcodeError = 'Is to short'
            }
        }
        if (name === 'address') {
            errorMass.addressError = '';
            if (value.length <= 0) {
                errorMass.addressError = 'required'
            }
            else if (value.length <= 5) {
                errorMass.addressError = 'Is to short'
            }
        }
        if (name === 'date') {
            errorMass.dateError = '';
            if (value.length <= 0) {
                errorMass.dateError = 'required'
            }
            }

        this.setState({
            errors: errorMass,
        }, this.validateForm);

        this.setState({
            user: update(this.state.user, {
                [name]: {$set: value}
            })
        })
    }
    handleChange (target) {
        this.setState({
            startDate: target,
            user: update(this.state.user, {
                'date': {$set: moment(target).format("YYYY/MM/DD")}
            })
        }, this.validateForm)

    }


    submit (e) {
        e.preventDefault();
        let errorMass = {};
        this.setState({
            errors: errorMass
        });
        if (Object.keys(errorMass).length === 0) {
            this.props.changeStateProps('user', this.state.user);
            this.setState({
                user: {
                    name: '',
                    email: '',
                    phone: '',
                    postcode: '',
                    address: '',
                }
            })
        }
    }

    keydowPhone(e){
        if(e.keyCode < 49 || e.keyCode > 58){
            e.preventDefault()
        }
    }

    render() {
        return (
            <form className={'form'}>
                <input
                    onChange={this.changeInput}
                    onBlur={this.changeInput}
                    value={this.state.user.name}
                    placeholder="name"
                    name="name"
                    type="text"
                />
                <span className="warning">{this.state.errors.nameError}</span>
                <input
                    onChange={this.changeInput}
                    onBlur={this.changeInput}
                    value={this.state.user.email}
                    type="email"
                    placeholder="Email"
                    name="email"
                />
                <span className="warning">{this.state.errors.emailError}</span>
                <input
                    onChange={this.changeInput}
                    onKeyDown={this.keydowPhone}
                    onBlur={this.changeInput}
                    value={this.state.user.phone}
                    placeholder="Phone"
                    name="phone"
                    type="text"
                />
                <span className="warning">{this.state.errors.phoneError}</span>

                <input
                    onChange={this.changeInput}
                    onBlur={this.changeInput}
                    value={this.state.user.address}
                    type="text"
                    placeholder="address"
                    name="address"
                />
                <span className="warning">{this.state.errors.addressError}</span>

                <input
                    onChange={this.changeInput}
                    onBlur={this.changeInput}
                    value={this.state.user.postcode}
                    placeholder="postcode"
                    name="postcode"
                    type="text"
                />
                <span className="warning">{this.state.errors.postcodeError}</span>
                <DatePicker
                    onChange={this.handleChange}
                    onBlur={this.changeInput}
                    value={this.state.user.date}
                    name="date"
                    placeholder="address"
                    dateFormat="YYYY/MM/DD"
                />
                <span className="warning">{this.state.errors.dateError}</span>
                <button type="submit" className={'submit-input'} value="Submit" disabled={!this.state.formValid} onClick={this.submit}>Submit</button>
            </form>
        )
    }
}
