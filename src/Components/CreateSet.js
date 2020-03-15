import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { createStableSet } from '../eth/setSetup';

export default class CreateSet extends Component {
    constructor() {
        super(); 
        
        this.state = {
            show: false,
            name: '',
            symbol: ''
        }
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    handleInput = event => this.setState({
        [event.target.name]: event.target.value
    })

    render() {
        const { show, name, symbol } = this.state;
        return (
            <div>
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        this.setState({ show: true });
                    }}
                >   
                    <input
                        placeholder='Name'
                        onChange={this.handleInput}
                        name='name'
                        required
                    ></input>
                    <input
                        placeholder='Symbol'
                        onChange={this.handleInput}
                        name='symbol'
                        required
                    ></input>
                    <button type='submit'>Pop Up</button>
                </form>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Set Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You are creating a new set</Modal.Body>
                    <Modal.Body>{name}</Modal.Body>
                    <Modal.Body>{symbol}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Create Set
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
