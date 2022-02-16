import sdk from './1-initialize-sdk.js';
import { ethers } from 'ethers';

const bundleDropModule = sdk.getBundleDropModule(
    process.env.DROP_MODULE
);

const tokenModule = sdk.getTokenModule(
    process.env.TOKEN_ADDRESS
);

( async () => {
    try {
        //Get all wallets who own the NFT that we created.
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if(walletAddresses.length === 0) {
            console.log("No one currently own the NFT, cannot perform an airdrop");
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map( (wallet) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);

            console.log(`Airdropping ${randomAmount} to ${wallet}`);

            const target = {
                address: wallet,
                amount = ethers.utils.parseUnits(randomAmount.toString(), 18),
            };

            return target;
        });

        console.log("Beginning Airdrop!");
        await tokenModule.transferBatch(airdropTargets);

        console.log("Successfully completed AIR-drop");
    } catch (e) {
        console.log("Failed to complete airdrop: ",e);
    }
})();
