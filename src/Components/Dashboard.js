import React, { Component } from 'react';
import { createStableSet } from '../eth/setSetup';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            address: ''
        }
    }

    componentDidMount = async () => {
        const addresses = await window.ethereum.enable();
        const address = addresses[0];
        this.setState({address});
    }

    render() {
        const { address } = this.state;
        return (
            <div>
                <h3>Click the button below to create a stable set</h3>
                <button onClick={()=>createStableSet(address)}>Click me</button>
            </div>
        )
    }
}
