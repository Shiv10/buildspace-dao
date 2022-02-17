import sdk from './1-initialize-sdk.js';
import { ethers, providers } from 'ethers';

const voteModule = sdk.getVoteModule(
    process.env.VOTE_MODULE
);

const tokenModule = sdk.getTokenModule (
    process.env.TOKEN_ADDRESS
);

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log("Successfully gave vote module miter role!")
    } catch(e) {
        console.log("Failed to give minter role to vote module.");
        process.exit(0);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS,
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent60 = ownedAmount.div(100).mul(60);

        await tokenModule.transfer(voteModule.address, percent60);

        console.log("Successfully transfered 60% tokens to treasury.");
    } catch (err) {
        console.log(err);
    }
})();