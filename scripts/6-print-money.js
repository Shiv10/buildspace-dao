import sdk from './1-initialize-sdk.js'
import { ethers } from 'ethers'

const tokenModule = sdk.getTokenModule(
    process.env.TOKEN_ADDRESS
);

(async ()=> {
    try {
        const amount = 1_000_000;

        const amount18 = ethers.utils.parseUnits(amount.toString(), 18);

        await tokenModule.mint(amount18);
        const totalSupply = await tokenModule.totalSupply();
        console.log(`There are now ${ethers.utils.formatUnits(totalSupply, 18)} FAB in circulation`);
    } catch (e) {
        console.log("Failed to mint tokens: ", e);
    }
})();