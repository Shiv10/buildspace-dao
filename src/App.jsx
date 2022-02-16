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
  else {
    return (
      <div className="landing">
        <h1>Welcome to My DAO</h1>
      </div>
    );
  }
};

export default App;
