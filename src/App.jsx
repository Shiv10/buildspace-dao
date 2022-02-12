import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";

const App = () => {

  const { connectWallet, address, error, provider } = useWeb3();
  console.log(`hello address: ${address}`);

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
