import sdk from './1-initialize-sdk.js'

const app = sdk.getAppModule(process.env.APP_ADDRESS);

(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "Transfer DAO governance token",
            symbol: "FAB",
        });
        console.log("Successfully deployed token module, address: ", tokenModule.address);
    } catch (e) {
        console.error("Failed to deploy module ", e);
    }
})();

