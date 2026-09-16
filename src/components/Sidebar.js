import { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { useHistory, useLocation } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
const Sidebar = ({ active, toggleSidebar }) => {
  // ==========================mint value ==================
  const [walletConnected, setWalletConnected] = useState(false);

  const [pagelocation, setPageLocation] = useState(useLocation().pathname);

  // Connect Wallet
  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      setWalletConnected(true);
    } else {
      window.open(
        `https://metamask.app.link/dapp/apemafiaclub.com${pagelocation}`
      );
    }
  };

  return (
    <div className={`sidebar ${active ? "active" : ""}`}>
      <div className="close-btn" onClick={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <ul className="sidenav-items">
        <NavLink title="Home" to="hero" />
        <NavLink title="Roadmap" to="road" />
        <NavLink title="Description" to="community" />
        <NavLink title="Team" to="team" />
        <NavLink title="FAQ" to="faq" />
        <button className="sidenav-btn" onClick={connectWallet}>
          <div className="hover-btn">
            {walletConnected ? "CONNECTED" : "CONNECT WALLET"}
            <svg
              className="svg-fill"
              width="200"
              height="50"
              viewBox="0 0 198 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M176.516 0H3C1.34315 0 0 1.34315 0 3V45C0 46.6569 1.34314 48 3 48H195C196.657 48 198 46.6569 198 45V19.2057C198 18.3416 197.627 17.5195 196.978 16.9499L178.494 0.744216C177.947 0.264492 177.244 0 176.516 0Z"
                fill="#B33A39"
              />
            </svg>
          </div>
          <svg
            className="svg-outline"
            width="198"
            height="48"
            viewBox="0 0 200 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M177.516 1H4C2.34315 1 1 2.34315 1 4V46C1 47.6569 2.34314 49 4 49H196C197.657 49 199 47.6569 199 46V20.2057C199 19.3416 198.627 18.5195 197.978 17.9499L179.494 1.74422C178.947 1.26449 178.244 1 177.516 1Z"
              stroke="white"
            />
          </svg>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
