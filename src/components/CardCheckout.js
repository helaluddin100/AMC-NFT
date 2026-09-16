import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CardCheckout = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const busy = status === "loading";
  const inCheckout = status === "checkout" && Boolean(checkoutUrl);

  const onPay = async (event) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setStatus("loading");
    setCheckoutUrl("");

    try {
      const response = await fetch("/api/create-checkout-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await response.json();

      if (!response.ok || data.error || !data.checkoutUrl) {
        setStatus("error");
        setError(
          (data && data.message) ||
            "Unable to start card checkout right now. Please try again."
        );
        return;
      }

      setEmail(trimmed);
      setCheckoutUrl(data.checkoutUrl);
      setStatus("checkout");
    } catch (_err) {
      setStatus("error");
      setError("Unable to start card checkout right now. Please try again.");
    }
  };

  return (
    <div className="mint-container amc-checkout">
      <div className="amc-checkout__glow" aria-hidden="true" />

      <p className="amc-checkout__eyebrow">Ape Mafia Club</p>
      <h1 className="mint-heading amc-checkout__title">
        {inCheckout ? (
          <>
            COMPLETE <br /> YOUR MINT
          </>
        ) : (
          <>
            BUY YOUR <br /> APE MAFIA NFT
          </>
        )}
      </h1>

      {!inCheckout ? (
        <p className="amc-checkout__lead">
          Pay with card. NFT delivers to your email — no crypto wallet needed.
        </p>
      ) : null}

      {!inCheckout ? (
        <form className="amc-checkout__panel claim-form" onSubmit={onPay}>
          <label className="claim-label" htmlFor="checkout-email">
            Delivery email
          </label>
          <input
            id="checkout-email"
            className="claim-input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            disabled={busy}
            required
          />

          <button className="mint-btn" type="submit" disabled={busy}>
            <div className="hover-btn">
              <p>{busy ? "Opening checkout..." : "Pay with Card"}</p>
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
      ) : null}

      {error ? <p className="amc-checkout__error">{error}</p> : null}

      {inCheckout ? (
        <div className="amc-checkout__stage">
          <div className="amc-checkout__delivery">
            <span className="amc-checkout__delivery-label">Delivering to</span>
            <strong className="amc-checkout__delivery-email">{email}</strong>
          </div>

          <div className="amc-checkout__frame">
            <div className="amc-checkout__frame-edge" aria-hidden="true" />
            <iframe
              title="Crossmint Card Checkout"
              className="crossmint-checkout-frame"
              src={checkoutUrl}
              allow="payment *; publickey-credentials-get *"
            />
          </div>

          <button
            type="button"
            className="claim-change-email"
            onClick={() => {
              setStatus("idle");
              setCheckoutUrl("");
              setError("");
            }}
          >
            Use a different email
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CardCheckout;
