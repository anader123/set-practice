import React, { Component } from 'react'

export default class SliderBar extends Component {
    constructor() {
        super();

        this.state = {
            value: 0
        }
    }

    handleChange = event => {
        const valuesCopy = this.props.values;
        valuesCopy[this.props.index] = +event.target.value;
        const valuesSum = valuesCopy.reduce((a, b) => a + b, 0);
        console.log(valuesSum)
        console.log(this.props.values)
        if(valuesSum <= 100) {
            this.setState({ value: event.target.value });
            this.props.values[this.props.index] = +event.target.value;
            this.props.sumValues();
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
