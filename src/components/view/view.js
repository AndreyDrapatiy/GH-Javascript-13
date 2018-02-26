import React, { Component } from 'react'

export default class View extends Component {
    render () {
        return (
            <p>
                <p>{this.props.testUser.name}</p>
                <p>{this.props.testUser.email}</p>
                <p>{this.props.testUser.phone}</p>
                <p>{this.props.testUser.address}</p>
                <p>{this.props.testUser.postcode}</p>
                <p>{this.props.testUser.date}</p>
            </p>
        )
    }
}
