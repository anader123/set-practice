import SetProtocol from 'setprotocol.js';
import * as Web3 from 'web3';
import BigNumber from 'bignumber.js';

const injectedWeb3 = window.web3 || undefined;
let provider;

try {
    provider = injectedWeb3.currentProvider;
}
catch (err) {
    throw new Error(`No inject web3: ${err}`)
}

// Kovan Network
const config = {
  coreAddress: '0x3ee64Fe0b9246Ae52845F01A79c4b3A6D252289a',
  exchangeIssuanceModuleAddress: '0x887E45236B280B33C743075ac11dD69E3c581697',
  kyberNetworkWrapperAddress: '0x4093415A2eA915EaacF44Ac08A42434aE6A9d4e5',
  protocolViewerAddress: '0x5754FA9d232812F817F5Ca58152Ad1E991e916dD',
  rebalanceAuctionModuleAddress: '0xeA510E982c92620A19475F8Dc777bAaa3c2A00F5',
  rebalancingSetExchangeIssuanceModule: '0xC2eF8799315E08f4ee08eA29913D2e51dba5aB78',
  rebalancingSetIssuanceModule: '0x91E1489D04054Ae552a369504F94E0236909c53c',
  rebalancingSetTokenFactoryAddress: '0xdc5B19c7085eBEE3AF84cf30418c0ECa11Ed1933',
  setTokenFactoryAddress: '0x952F78C33D3fb884C00b22e69B9119cd70582F80',
  transferProxyAddress: '0x61d264865756751392C0f00357Cc26ea70D98E3B',
  vaultAddress: '0x45Ab785b6c04f11b5e49B03d60f3642A8Ffe9246',
  wrappedEtherAddress: '0x8a18c7034aCEfD1748199a58683Ee5F22e2d4e45',
};

// Ganche 
// const config = {
//   coreAddress:	0x5315e44798395d4a952530d131249fe00f554565,
//   setTokenFactoryAddress:	0xdff540fe764855d3175dcfae9d91ae8aee5c6d6f,
//   vaultAddress:	0x72d5a2213bfe46df9fbda08e22f536ac6ca8907e,
//   transferProxyAddress:	0x2ebb94cc79d7d0f1195300aaf191d118f53292a8,
//   rebalancingSetTokenFactoryAddress:	0xc1be2c0bb387aa13d5019a9c518e8bc93cb533,
// }

// const web3 = new Web3();
// const provider = new Web3.providers.HttpProvider('http://localhost:7545');

const setProtocol = new SetProtocol(provider, config);

export const createStableSet = async (setDetails, userAddress, setName, setSymbol) => {
  const componentAddresses = [];
  const componentAmounts = [];

  setDetails.forEach(token => {
    componentAddresses.push(token.address);
    componentAmounts.push(new BigNumber((token.amount/100)));
  })

  const { units, naturalUnit } = await setProtocol.calculateSetUnitsAsync(
    componentAddresses,
    [new BigNumber(1), new BigNumber(1)], // Asset Prices
    componentAmounts,
    new BigNumber(1) // Set Target Price 
  );

  const txOpts = {
    userAddress,
    gas: 4000000,
    gasPrice: 8000000000
  }

  const transactionHash = await setProtocol.createSetAsync(
    componentAddresses,
    units,
    naturalUnit,
    setName,
    setSymbol,
    txOpts
  );

  return transactionHash;
}

export const getSetAddress = async (transactionHash) => {
  const setAddress = await setProtocol.getSetAddressFromCreateTxHashAsync(transactionHash);
  return setAddress;
}