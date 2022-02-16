import sdk from './1-initialize-sdk.js';

const bundleDrop = sdk.getBundleDropModule(
    process.env.DROP_MODULE,
);

( async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();

        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1,
        });

        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("Successfully set claim condition on bundle drop: ", bundleDrop.address);
    } catch (e) {
        console.log("Failed to set claim conditions. ", e);
    }
})()
