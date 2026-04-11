import React, { useState, useCallback, useRef, useEffect } from "react";
import WebsiteNavbar from "../../components/website/WebsiteNavbar";
import WebsiteFooter from "../../components/website/WebsiteFooter";
import { setWebsiteSession, getWebsiteApiUrl } from "../../utils/websiteSession";

export default function WebsiteSignup() {
  const apiUrl = getWebsiteApiUrl();
  const [signupMode, setSignupMode] = useState(true);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [loginCodeSent, setLoginCodeSent] = useState(false);
  const [loadingLoginSend, setLoadingLoginSend] = useState(false);
  const [loadingLoginVerify, setLoadingLoginVerify] = useState(false);
  
  // Signup state
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });
  const [otp, setOtp] = useState("");
  const [pendingPayload, setPendingPayload] = useState(null);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const [signupDelivery, setSignupDelivery] = useState({ email: true, whatsapp: false, sms: false, demoOtp: "" });

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const handleLoginRequestCode = useCallback(async (e) => {
    e.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setLoadingLoginSend(true);
    try {
      const response = await fetch(`${apiUrl}/api/kyc/login/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        showToast(data.message || "Unable to send login code", "error");
        return;
      }
      setLoginCodeSent(true);
      showToast(data.message || "Verification code sent", "success");
    } catch (err) {
      showToast("Unable to send code. Please try again.", "error");
    } finally {
      setLoadingLoginSend(false);
    }
  }, [apiUrl, loginEmail, showToast]);

  const handleLoginVerify = useCallback(async (e) => {
    e.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    const otpValue = loginOtp.trim();
    if (!/^\d{6}$/.test(otpValue)) {
      showToast("Enter a valid 6-digit code", "error");
      return;
    }
    setLoadingLoginVerify(true);
    try {
      const response = await fetch(`${apiUrl}/api/kyc/login/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.token || !data.user) {
        showToast(data.message || "Invalid code", "error");
        return;
      }
      setWebsiteSession(data.user, data.token);
      showToast("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "/website/index";
      }, 800);
    } catch (err) {
      showToast("Login failed. Please try again.", "error");
    } finally {
      setLoadingLoginVerify(false);
    }
  }, [apiUrl, loginEmail, loginOtp, showToast]);

  const handleSignupSubmit = useCallback(async (e) => {
    e.preventDefault();
    const payload = {
      firstName: signup.firstName.trim(),
      lastName: signup.lastName.trim(),
      email: signup.email.trim().toLowerCase(),
      phone: signup.phone.trim(),
      password: signup.password
    };
    if (!payload.firstName || !payload.email || !payload.phone || !payload.password) {
      showToast("Please fill all required fields", "error");
      return;
    }
    if (!/^\d{10}$/.test(payload.phone)) {
      showToast("Enter a valid 10-digit phone number", "error");
      return;
    }
    setLoadingCreate(true);
    try {
      const res = await fetch(`${apiUrl}/api/kyc/signup/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Unable to send verification code");
      }
      setPendingPayload(payload);
      setVerificationVisible(true);
      setSignupDelivery({
        email: data?.channels?.email !== false,
        whatsapp: Boolean(data?.channels?.whatsapp),
        sms: Boolean(data?.channels?.sms),
        demoOtp: data?.demoOtp || ""
      });
      showToast(data.message || "Verification code sent", "success");
    } catch (err) {
      showToast(err.message || "Cannot create account now", "error");
    } finally {
      setLoadingCreate(false);
    }
  }, [apiUrl, signup, showToast]);

  const handleVerify = useCallback(async () => {
    if (!pendingPayload) {
      showToast("Please submit the form first", "error");
      return;
    }
    const otpValue = otp.trim();
    if (!/^\d{6}$/.test(otpValue)) {
      showToast("Enter a valid 6-digit code", "error");
      return;
    }
    setLoadingVerify(true);
    try {
      const res = await fetch(`${apiUrl}/api/kyc/signup/verify-and-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pendingPayload, otp: otpValue })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Verification failed");
      }
      if (data.user && data.token) {
        setWebsiteSession(data.user, data.token);
      }
      showToast("Account created successfully!", "success");
      setTimeout(() => {
        window.location.href = "/website/index";
      }, 900);
    } catch (err) {
      showToast(err.message || "Verification failed", "error");
    } finally {
      setLoadingVerify(false);
    }
  }, [apiUrl, otp, pendingPayload, showToast]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <WebsiteNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[200px] bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {signupMode ? "Create Your Account" : "Sign In"}
            </h1>
            <p className="text-lg text-gray-600">
              {signupMode ? "Join Roomhy today!" : "Welcome back!"}
            </p>
          </div>
        </div>

        {/* Auth Section */}
        <section className="py-16 bg-white">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              {signupMode ? (
                // SIGNUP FORM
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                        required
                        value={signup.firstName}
                        onChange={(e) => setSignup({ ...signup, firstName: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                        value={signup.lastName}
                        onChange={(e) => setSignup({ ...signup, lastName: e.target.value })}
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      required
                      value={signup.email}
                      onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits)"
                      maxLength="10"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      required
                      value={signup.phone}
                      onChange={(e) => setSignup({ ...signup, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      required
                      value={signup.password}
                      onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                    />
                    {verificationVisible && (
                      <>
                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                          <p>
                            Code sent to your email
                            {signupDelivery.whatsapp ? " and WhatsApp" : signupDelivery.sms ? " and phone" : ""}.
                          </p>
                          {signupDelivery.demoOtp ? (
                            <p className="mt-1 font-semibold">Demo OTP: {signupDelivery.demoOtp}</p>
                          ) : null}
                        </div>
                        <input
                          type="text"
                          placeholder="6-digit Verification Code"
                          maxLength="6"
                          inputMode="numeric"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        />
                        <button
                          type="button"
                          onClick={handleVerify}
                          disabled={loadingVerify}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                        >
                          {loadingVerify ? "Verifying..." : "Verify & Create"}
                        </button>
                      </>
                    )}
                    <button
                      type="submit"
                      disabled={loadingCreate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                    >
                      {loadingCreate ? "Sending Code..." : "Create Account"}
                    </button>
                  </form>
                  <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => { setSignupMode(false); setLoginCodeSent(false); }}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Log in
                    </button>
                  </p>
                </>
              ) : (
                // LOGIN FORM
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
                  <form onSubmit={loginCodeSent ? handleLoginVerify : handleLoginRequestCode} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    {loginCodeSent && (
                      <input
                        type="text"
                        placeholder="6-digit Verification Code"
                        maxLength="6"
                        inputMode="numeric"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      />
                    )}
                    <button
                      type="submit"
                      disabled={loginCodeSent ? loadingLoginVerify : loadingLoginSend}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                    >
                      {loginCodeSent
                        ? (loadingLoginVerify ? "Verifying..." : "Verify & Login")
                        : (loadingLoginSend ? "Sending Code..." : "Send Login Code")}
                    </button>
                    {loginCodeSent && (
                      <button
                        type="button"
                        onClick={handleLoginRequestCode}
                        disabled={loadingLoginSend}
                        className="w-full text-sm text-blue-600 font-semibold hover:underline"
                      >
                        Resend Code
                      </button>
                    )}
                  </form>
                  <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => { setSignupMode(true); setLoginCodeSent(false); }}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <WebsiteFooter />

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 right-5 z-50 px-4 py-3 rounded-lg text-white text-sm shadow-lg"
          style={{
            background:
              toast.type === "error"
                ? "#ef4444"
                : toast.type === "success"
                  ? "#10b981"
                  : "#3b82f6"
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
