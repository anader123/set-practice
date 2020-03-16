import React, { Component } from 'react';
import { createStableSet } from '../eth/setSetup';
import { issueStableSet, approveTokensForTransfer } from '../eth/addTokens';
import { redeemSet } from '../eth/redeemSet';
import CreateSet from './CreateSet';
import SetCard from './SetCard';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            address: '',
            setAddress: '',
            daiAddress: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
            tUSDAddress: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE'
        }
    }

    componentDidMount = async () => {
        const addresses = await window.ethereum.enable();
        const address = addresses[0];
        this.setState({address});
    }

    createSet = async () => {
        const { address } = this.state;
        const setAddress = await createStableSet(address);
        this.setState({setAddress})
    }

    addTokens = async () => {
        const { address, tUSDAddress, daiAddress, setAddress } = this.state;
        const componentAddresses = [tUSDAddress, daiAddress];

        await approveTokensForTransfer(componentAddresses);

        const issueTxHash = await issueStableSet(setAddress, address);
        console.log(issueTxHash);
    }

    convertSet = async () => {
        const { address, setAddress } = this.state;
        const txHash = await redeemSet(setAddress, address);
        console.log(txHash);
    }

    render() {
        const { setAddress } = this.state;
        return (
            <div>
                <h3>Click the button below to create a stable set</h3>
                <h3>Set Address: {setAddress}</h3>
                <CreateSet />
                <SetCard />
            </div>
        )
    }
}

