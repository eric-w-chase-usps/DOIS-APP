import { useState } from 'react'
import { FaRegEnvelope } from "react-icons/fa";
import uspsImg from "./assets/usps-transp-outline.png";
import './App.css'


// Simulated API calls — replace these with real fetch/axios calls to your backend
async function loginRequest(username, password) {
  // Example: const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) });
  await new Promise((r) => setTimeout(r, 600));
  if (username === "demo" && password === "password123") {
    return { success: true, requires2FA: true };
  }
  throw new Error("Invalid username or password");
}

async function verifyOtpRequest(otp) {
  await new Promise((r) => setTimeout(r, 600));
  if (otp === "123456") {
    return { success: true, token: "fake-jwt-token" };
  }
  throw new Error("I nvalid verification code");
}


export default function LoginWith2FA() {
  const [step, setStep] = useState("credentials"); // "credentials" | "otp" | "done"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await loginRequest(username, password);
      if (result.requires2FA) {
        setStep("otp");
      } else {
        setStep("done");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyOtpRequest(otp);
      setStep("done");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "done") {
    return (
      <div className="page">
        <div className="card">
          <h2 className="title">You're logged in</h2>
          <p>Welcome back, {username}.</p>
        </div>
      </div>
    );
  }



  return (
    <div className="page">
      <div className="card">
        <h3 className="title">
          <img src={uspsImg} alt="USPS logo" width="250" height="50" />
          <br/>
          <br/>
         <span style={{ display: 'inline-flex', alignItems: 'center', gap:"10px"}}><FaRegEnvelope size="30"/> <b className="decal">Delivery Operations Information System</b> (DOIS)</span>
        </h3>
        <h3 className="subTitle">
          <p>Welcome! <b>Login to getting started.</b></p>
        </h3>

        {error && <div className="error">{error}</div>}

        {step === "credentials" && (
          <form onSubmit={handleCredentialsSubmit}>
            <label className="label" htmlFor="username" />
            <input
              id="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="AceID"
              autoComplete="username"
              required
            />

            <label className="label" htmlFor="password" />
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <br />
            <button
              type="submit"
              className={`button ${loading ? "buttonDisabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Enter"}
            </button>

            <p className="hint">Forgot password! <a className="hint" href="http://example.com">Click here</a></p>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit}>
            <label className="label" htmlFor="otp">6-digit code</label>
            <input
              id="otp"
              className="input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            
            <button
              type="submit"
              className={`button ${loading ? "buttonDisabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>

            <p className="hint">Demo code: 123456</p>
          </form>
        )}
      </div>
    </div>
  );
}
