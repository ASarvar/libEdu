"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/layout/PageHead";
import LogoMain from "../../public/images/logo.svg";

const SignupPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("auth.errors.fullNameRequired");
    }

    if (!formData.email) {
      newErrors.email = t("auth.errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth.errors.emailInvalid");
    }

    if (!formData.phone) {
      newErrors.phone = t("auth.errors.phoneRequired");
    } else if (!/^\+998\s?\d{2}\s?\d{3}-?\d{2}-?\d{2}$/.test(formData.phone)) {
      newErrors.phone = t("auth.errors.phoneInvalid");
    }

    if (!formData.password) {
      newErrors.password = t("auth.errors.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = t("auth.errors.passwordMinLength");
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.errors.passwordRequired");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("auth.errors.passwordMismatch");
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = t("auth.errors.termsRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || 'Registration failed' });
        return;
      }

      alert(t("auth.success.signupSuccess"));
      window.location.href = '/login';
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHead headTitle={t("signup.title")} />
      
      <section className="login-section signup-section">
        <div
          className="bg bg-image"
          style={{ backgroundImage: "url(images/background/bg-gradient-1.jpg)" }}
        />
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="login-form-box">
                {/* Logo */}
                <div className="logo-box text-center mb-40">
                  <Link href="/">
                    <Image
                      src={LogoMain}
                      alt="Logo"
                      style={{ width: "auto", height: "60px", margin: "0 auto" }}
                    />
                  </Link>
                </div>

                {/* Title */}
                <div className="form-header text-center mb-40">
                  <h2 className="form-title">{t("signup.title")}</h2>
                  <p className="form-subtitle">{t("signup.subtitle")}</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                  {/* Full Name Field */}
                  <div className="form-group">
                    <label htmlFor="fullName">{t("signup.fullName")}</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      placeholder={t("signup.fullNamePlaceholder")}
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label htmlFor="email">{t("signup.email")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder={t("signup.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="form-group">
                    <label htmlFor="phone">{t("signup.phone")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder={t("signup.phonePlaceholder")}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label htmlFor="password">{t("signup.password")}</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder={t("signup.passwordPlaceholder")}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group">
                    <label htmlFor="confirmPassword">{t("signup.confirmPassword")}</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                      placeholder={t("signup.confirmPasswordPlaceholder")}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="form-group">
                    <div className={`custom-control custom-checkbox ${errors.agreeTerms ? "is-invalid" : ""}`}>
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                      />
                      <label className="custom-control-label" htmlFor="agreeTerms">
                        {t("signup.agreeTerms")}
                        <Link href="/about" className="terms-link">
                          {t("signup.termsLink")}
                        </Link>
                        {" "}{t("signup.and")}{" "}
                        <Link href="/about" className="terms-link">
                          {t("signup.privacyLink")}
                        </Link>
                        {t("signup.agreeEnd")}
                      </label>
                    </div>
                    {errors.agreeTerms && (
                      <div className="invalid-feedback d-block">{errors.agreeTerms}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="theme-btn btn-style-one w-100"
                      disabled={isSubmitting}
                    >
                      <span className="btn-title">
                        {isSubmitting ? "..." : t("signup.signupButton")}
                      </span>
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center mb-30">
                    <p className="signup-text">
                      {t("signup.haveAccount")}{" "}
                      <Link href="/login" className="signup-link">
                        {t("signup.loginLink")}
                      </Link>
                    </p>
                  </div>

                  {/* Social Login */}
                  <div className="social-login">
                    <div className="divider">
                      <span>{t("signup.orSignupWith")}</span>
                    </div>
                    <div className="social-buttons">
                      <button
                        type="button"
                        className="social-btn google-btn"
                        onClick={() => console.log("Google signup")}
                      >
                        <i className="fab fa-google"></i>
                        {t("signup.signupWithGoogle")}
                      </button>
                      <button
                        type="button"
                        className="social-btn facebook-btn"
                        onClick={() => console.log("Facebook signup")}
                      >
                        <i className="fab fa-facebook-f"></i>
                        {t("signup.signupWithFacebook")}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Back to Home */}
                <div className="text-center mt-30">
                  <Link href="/" className="back-home-link">
                    <i className="fa fa-arrow-left mr-2"></i>
                    {t("signup.backToHome")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
