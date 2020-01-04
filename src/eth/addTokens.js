import { setProtocol } from './setSetup';
import BigNumber from "bignumber.js";

// const tUSDAddress = '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B';
// const daiAddress = '0x1d82471142F0aeEEc9FC375fC975629056c26ceE';
// const componentAddresses = [tUSDAddress, daiAddress];

export const approveTokensForTransfer = (tokenAddresses) => {
    tokenAddresses.forEach(async (address) => {
        await setProtocol.setUnlimitedTransferProxyAllowanceAsync(
            address, { gas: 350000, gasPrice: 6000000000 }
        );
    })
}

// approveTokensForTransfer(componentAddresses);

// const stableSetAddress = createStableSet();

// console.log(stableSetAddress)

export const issueStableSet = async (stableSetAddress, from) => {
    const issueQuantity = new BigNumber(10 ** 18);
    const isMultipleOfNaturalUnit = await setProtocol.setToken.isMultipleOfNaturalUnitAsync(stableSetAddress, issueQuantity);

    if(isMultipleOfNaturalUnit) {
        try {
            return await setProtocol.issueAsync(
                stableSetAddress,
                issueQuantity,
                {
                    from,
                    gas: 4000000,
                    gasPrice: 8000000000
                }
            )
        }
        catch (err) {
            throw new Error(`Error when issuing a new Set token: ${err}`);
        }
    }
    throw new Error(`Issue amount is not a multiple of natural unit`);
}