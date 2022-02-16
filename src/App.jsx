import { useEffect, useMemo, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";

const sdk = new ThirdwebSDK("rinkeby");

const bundleDropModule = sdk.getBundleDropModule(
  '0xec585f1103706a2bdcc7d4be2a62a6d586d5b3e1',
);

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log(`hello address: ${address}`);

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner(): undefined;

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(async () => {
    sdk.setProviderOrSigner(signer);
  },  [signer]);

  useEffect(async () => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return;
    }

    // Check if the user has the NFT by using bundleDropModule.balanceOf
    const balance = await bundleDropModule.balanceOf(address, "0");
   
    try {
      // If balance is greater than 0, they have our NFT!
      if(balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
      } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.")
      }
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("failed to nft balance", error);
  }
}, [address]);


  if(!address) {
    return (
      <div className="landing">
        <h1 style={{color: "black"}}>Welcome to Football Transfers DAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    )
  }

  if(hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    )
  }

  const mintNft = async () => {
    setIsClaiming(true);
    try {
      await bundleDropModule.claim("0", 1);
      setHasClaimedNFT(true);
      console.log(`Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`);
    } catch (e) {
      console.log("Failed to claim ", error);
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <div className="mint-nft">
      <h1>Mint your free DAO membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick = {() => mintNft()}
      >
        {isClaiming ? "Minting...": "Mint your nft (FREE)"}
      </button>
    </div>
  )
  
};

export default App;
