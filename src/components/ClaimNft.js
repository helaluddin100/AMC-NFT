import { useEffect, useRef, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 90000;

const ClaimNft = () => {
  const [email, setEmail] = useState("");
  const [claimCode, setClaimCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [requiresClaimCode, setRequiresClaimCode] = useState(false);
  const pollingRef = useRef(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.requiresClaimCode) {
          setRequiresClaimCode(true);
        }
      })
      .catch(() => {});

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const pollStatus = (actionId) => {
    stopPolling();
    startedAtRef.current = Date.now();

    pollingRef.current = setInterval(async () => {
      if (Date.now() - startedAtRef.current > POLL_TIMEOUT_MS) {
        stopPolling();
        setStatus("timeout");
        setMessage(
          "Your NFT mint is still processing. Please check your email in a few minutes, or try status again later."
        );
        return;
      }

      try {
        const response = await fetch(`/api/mint-status/${encodeURIComponent(actionId)}`);
        const data = await response.json();

        if (!response.ok || data.error) {
          return;
        }

        if (data.status === "success" || data.status === "succeeded") {
          stopPolling();
          setStatus("success");
          setMessage(
            "Your NFT has been minted successfully. Please check the email address you provided for instructions to access your NFT."
          );
          return;
        }

        if (data.status === "failed" || data.status === "error") {
          stopPolling();
          setStatus("failed");
          setMessage("Unable to mint your NFT right now. Please try again.");
        }
      } catch (_error) {
        // Keep polling on transient network errors until timeout.
      }
    }, POLL_INTERVAL_MS);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("Minting your NFT...");

    try {
      const response = await fetch("/api/mint-nft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          ...(claimCode ? { claimCode } : {}),
        }),
      });
      const data = await response.json();

      if (
        response.status === 409 &&
        data.actionId &&
        data.status !== "success" &&
        data.status !== "succeeded"
      ) {
        setStatus("pending");
        setMessage(
          data.message ||
            "Your NFT mint request has been submitted. Please wait while we confirm the mint."
        );
        pollStatus(data.actionId);
        return;
      }

      if (!response.ok || data.error) {
        setStatus("error");
        setMessage(data.message || "Unable to mint your NFT right now. Please try again.");
        if (data.message && data.message.toLowerCase().includes("claim")) {
          setRequiresClaimCode(true);
        }
        return;
      }

      setStatus("pending");
      setMessage(
        data.message ||
          "Your NFT mint request has been submitted. Please wait while we confirm the mint."
      );

      if (data.actionId) {
        pollStatus(data.actionId);
      }
    } catch (_error) {
      setStatus("error");
      setMessage("Unable to mint your NFT right now. Please try again.");
    }
  };

  const busy = status === "submitting" || status === "pending";

  return (
    <div className="mint-container">
      <h1 className="mint-heading">
        CLAIM YOUR <br /> APE MAFIA NFT
      </h1>

      <form className="claim-form" onSubmit={onSubmit}>
        <label className="claim-label" htmlFor="claim-email">
          Email Address
        </label>
        <input
          id="claim-email"
          className="claim-input"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          required
        />

        {(requiresClaimCode || claimCode) && (
          <>
            <label className="claim-label" htmlFor="claim-code">
              Claim Code
            </label>
            <input
              id="claim-code"
              className="claim-input"
              type="text"
              value={claimCode}
              onChange={(e) => setClaimCode(e.target.value)}
              disabled={busy}
              placeholder="Enter claim code"
            />
          </>
        )}

        <button className="mint-btn" type="submit" disabled={busy}>
          <div className="hover-btn">
            <p>{busy ? "Minting your NFT..." : "Claim NFT"}</p>
            <svg
              className="svg-fill"
              viewBox="0 0 1148 104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1081 0H0V104H1148V35.8621L1081 0Z" fill="#B33A39" />
            </svg>
          </div>
          <svg
            className="svg-outline"
            viewBox="0 0 1150 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1082 1H1V105H1149V36.8621L1082 1Z" stroke="white" />
          </svg>
        </button>
      </form>

      {message && (
        <p
          className="cross-mint-title"
          style={{
            color:
              status === "success"
                ? "#9dffb0"
                : status === "error" || status === "failed"
                ? "#ffb4b4"
                : "#ffffff",
          }}
        >
          {message}
        </p>
      )}

      <h1 className="cross-mint-title">
        No wallet needed. Enter your email and we will deliver your NFT through Crossmint.
      </h1>
    </div>
  );
};

export default ClaimNft;
