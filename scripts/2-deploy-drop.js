import { ethers } from "ethers";
import sdk from './1-initialize-sdk.js';
import { readFileSync } from "fs";

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
    try {
        const bundleDropModule =  await app.deployBundleDropModule({
            name: "SIUUU",
            description: "Proof of membership to Transfers DAO",
            image: readFileSync("scripts/assets/ronaldo.jpeg"),
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log("Successfully deployed bundle drop modeule address: ", bundleDropModule.address);

        console.log("Metadata for drop: ", await bundleDropModule.getMetadata());
    } catch (e) {
        console.log("Failed to deploy bubdle drop module ", e);
    }
})()