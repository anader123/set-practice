import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { tokenData } from '../eth/tokenData';

import SliderBar from '../Components/SliderBar';
import TokenCard from '../Components/TokenCard';
import PieChart from '../Components/PieChart';

import { createStableSet } from '../eth/setSetup';

export default class CreateSet extends Component {
    constructor() {
        super(); 
        
        this.state = {
            show: false,
            name: '',
            symbol: '',
            sliders: [],
            values: [],
            sliderSum: 0
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
        this.state.values.splice(index, 1);
        this.setState({ sliders })

        this.sumValues();
    }

    sumValues = () => {
        const sliderSum = this.state.values.reduce((a, b) => a + b, 0);
        this.setState({ sliderSum });
    }

    addSlider = token => {
        const sliders = this.state.sliders;
        const values = this.state.values;
        if(sliders.indexOf(token) === -1) {
            const index = tokenData.indexOf(token);
            tokenData[index].up = true;
            sliders.push(token);
            values.push(0);
            this.setState({ sliders, values});
        }
    }

    render() {
        const { show, name, symbol, sliders, values, sliderSum } = this.state;
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

                <svg width='300' height='300'>
                    <PieChart x={150} y={150} data={values} />
                </svg>

                {sliders.map((slider, index) => {
                    return(
                        <SliderBar 
                            sumValues={this.sumValues} 
                            values={values} 
                            sliders={sliders} 
                            index={index} 
                            removeSlider={this.removeSlider}
                            sliderSum={sliderSum}
                        />
                    )
                })}
                <div>Total: {sliderSum}%</div>                
            </div>
        )
    }
}
