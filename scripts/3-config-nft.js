import sdk from './1-initialize-sdk.js';
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    process.env.DROP_MODULE,
);

( async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Cristiano",
                description: "This NFT will give you access to Transfers DAO",
                image: readFileSync("scripts/assets/ronaldo.jpeg"),
            },
        ]);
        console.log("Successfully created a new NFT in the drop!");
    } catch (e) {
        console.log("error occurred ",e);
    }
})();