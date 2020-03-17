import React, { Component } from 'react'

export default class SliderBar extends Component {
    constructor() {
        super();

        this.state = {
            value: 0
        }
    }

    handleChange = event => this.setState({ value: event.target.value });

    render() {
        const { value } = this.state;
        const { sliders, removeSlider, index } = this.props;
        return (
            <div className='slider-container'>
                <div>{sliders[index].name}</div>
                <img src={sliders[index].image}/>
                <br/>
                <input className='slider' type='range' value={value} min={0} max={100/sliders.length} onChange={this.handleChange}/><span onClick={() => removeSlider(index, sliders)}>x</span>
                <div>{value}%</div>
            </div>
        )
    }
}
