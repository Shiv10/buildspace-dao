import sdk from './1-initialize-sdk.js'

const appModule = sdk.getAppModule(
    process.env.APP_ADDRESS
);

(async ()=> {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "Transfer DAO epic proposals",
            votingTokenAddress: process.env.TOKEN_ADDRESS,
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24*60*60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: "0",
        });

        console.log("Successfully deployed vote module at address: ", voteModule.address);
    } catch (e) {
        console.log("Error in deploying vote module: ",e);
    }
})();