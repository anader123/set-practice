import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { tokenData } from '../eth/tokenData';

import SliderBar from '../Components/SliderBar';
import TokenCard from '../Components/TokenCard';

import { createStableSet } from '../eth/setSetup';

export default class CreateSet extends Component {
    constructor() {
        super(); 
        
        this.state = {
            show: false,
            name: '',
            symbol: '',
            sliders: []
        }
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    handleInput = event => this.setState({
        [event.target.name]: event.target.value
    })

    removeSlider = (index, sliders) => {
        const index2 = tokenData.indexOf(sliders[index]);
        tokenData[index2].up = false;
        sliders.splice(index, 1);
        this.setState({ sliders })
    }

    addSlider = token => {
        const sliders = this.state.sliders;
        if(sliders.indexOf(token) === -1) {
            const index = tokenData.indexOf(token);
            tokenData[index].up = true;
            sliders.push(token);
            this.setState({ sliders });
        }
    }

    render() {
        const { show, name, symbol, sliders } = this.state;
        return (
            <div>
                {/* <form
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
                </Modal> */}

                <div className='set-card-container'>
                {tokenData.map((token) => {
                    return(
                        <TokenCard removeSlider={this.removeSlider} token={token} sliders={sliders} addSlider={this.addSlider}/>
                    )
                })}
                </div>

                {sliders.map((slider, index) => {
                    return(
                        <SliderBar sliders={sliders} index={index} removeSlider={this.removeSlider}/>
                    )
                })}

            </div>
        )
    }
}
