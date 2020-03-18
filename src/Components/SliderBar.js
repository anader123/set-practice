import React, { Component } from 'react'

export default class SliderBar extends Component {
    constructor() {
        super();

        this.state = {
            value: 0
        }
    }

    handleChange = event => {
        const { index, values, updateValues, sumValues } = this.props;
        const valuesCopy = [...values];
        valuesCopy[index] = +event.target.value;
        const valuesSum = valuesCopy.reduce((a, b) => a + b, 0);
        sumValues();
        if(valuesSum <= 100) {
            this.setState({ value: event.target.value });
            const newValues = [...values];
            newValues[index] = +event.target.value;
            updateValues(newValues);
        }
    };

    render() {
        const { value } = this.state;
        const { sliders, removeSlider, index, values } = this.props;
        return (
            <div className='slider-container'>
                <div>{sliders[index].name}</div>
                <img src={sliders[index].image}/>
                <br/>
                <input 
                    className='slider' 
                    type='range' 
                    value={value} 
                    min={0} 
                    max={100} 
                    step={5} 
                    onChange={this.handleChange}
                />
                <span onClick={() => removeSlider(index, sliders)}>x</span>
                <div>{value}%</div>
            </div>
        )
    }
}
