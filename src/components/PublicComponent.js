import React from "react";
import Timer from "./CountDown";
import { Link } from "react-router-dom";
const PublicComponent = () => {
  return (
    <>
      <Timer />
      <Link to="/mint">
        <button
          data-aos="fade-up"
          data-aos-duration="1000"
          className="hero-btn"
        >
          <div className="hover-btn">
            MINT NOW
            <svg
              className="svg-fill"
              viewBox="0 0 247 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M220.477 0H3C1.34315 0 0 1.34315 0 3V57C0 58.6569 1.34315 60 3 60H244C245.657 60 247 58.6569 247 57V23.6654C247 22.8024 246.628 21.9812 245.98 21.4116L222.457 0.746199C221.909 0.265244 221.206 0 220.477 0Z"
                fill="#B33A39"
              />
            </svg>
          </div>
          <svg
            className="svg-outline"
            width="249"
            height="62"
            viewBox="0 0 249 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M221.477 1H4C2.34315 1 1 2.34315 1 4V58C1 59.6569 2.34315 61 4 61H245C246.657 61 248 59.6569 248 58V24.6654C248 23.8024 247.628 22.9812 246.98 22.4116L223.457 1.7462C222.909 1.26524 222.206 1 221.477 1Z"
              stroke="white"
            />
          </svg>
        </button>
      </Link>

      {/* <button
        data-aos="fade-up"
        data-aos-duration="1000"
        className="hero-btn"
        onClick={() => {
          window.open("https://discord.gg/B6UmHqZB3B", "_blank").focus();
        }}
      >
        <div className="hover-btn">
          JOIN DISCORD
          <svg
            className="svg-fill"
            viewBox="0 0 247 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M220.477 0H3C1.34315 0 0 1.34315 0 3V57C0 58.6569 1.34315 60 3 60H244C245.657 60 247 58.6569 247 57V23.6654C247 22.8024 246.628 21.9812 245.98 21.4116L222.457 0.746199C221.909 0.265244 221.206 0 220.477 0Z"
              fill="#B33A39"
            />
          </svg>
        </div>
        <svg
          className="svg-outline"
          width="249"
          height="62"
          viewBox="0 0 249 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M221.477 1H4C2.34315 1 1 2.34315 1 4V58C1 59.6569 2.34315 61 4 61H245C246.657 61 248 59.6569 248 58V24.6654C248 23.8024 247.628 22.9812 246.98 22.4116L223.457 1.7462C222.909 1.26524 222.206 1 221.477 1Z"
            stroke="white"
          />
        </svg>
      </button> */}
    </>
  );
};

export default PublicComponent;
