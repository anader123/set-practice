import { setProtocol } from './setSetup';
import BigNumber from "bignumber.js";

export const redeemSet = async (stableSetAddress, from) => {
    // const stableSetAddress = '0x9f0F7D5a10B6E1b00b211911B743EB6aA765C37f';
    const quantity = new BigNumber(10 ** 18);
    const withdraw = true;
    const tokensToExclude = [];
    const txOpts = {
        from,
        gas: 4000000,
        gasPrice: 8000000000
    };

    const txHash = await setProtocol.redeemAsync(
        stableSetAddress,
        quantity,
        withdraw,
        tokensToExclude,
        txOpts
    )
    return txHash;
}