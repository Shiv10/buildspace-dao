import sdk from './1-initialize-sdk.js';

const tokenModule = sdk.getTokenModule(process.env.TOKEN_ADDRESS);

(async ()=> {
    try {
        console.log("Current roles: ", await tokenModule.getAllRoleMembers());

        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log("Roles after removing admin: ", await tokenModule.getAllRoleMembers());
        console.log("Successfully removed our super powers :((");
    } catch (err) {
        console.log("Failed to revoke errors: ", err);
    }
})();