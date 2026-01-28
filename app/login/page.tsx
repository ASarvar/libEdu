"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/layout/PageHead";
import LogoMain from "../../public/images/logo.svg";

const LoginPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

    if (!formData.email) {
      newErrors.email = t("auth.errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth.errors.emailInvalid");
    }

    if (!formData.password) {
      newErrors.password = t("auth.errors.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = t("auth.errors.passwordMinLength");
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || 'Login failed' });
        return;
      }

      // Redirect based on role
      if (data.user.role === 'superadmin' || data.user.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/profile';
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHead headTitle={t("login.title")} />
      
      <section className="login-section">
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
                  <h2 className="form-title">{t("login.title")}</h2>
                  <p className="form-subtitle">{t("login.subtitle")}</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                  {/* Email Field */}
                  <div className="form-group">
                    <label htmlFor="email">{t("login.email")}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder={t("login.emailPlaceholder")}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label htmlFor="password">{t("login.password")}</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder={t("login.passwordPlaceholder")}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="form-group d-flex justify-content-between align-items-center">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                      />
                      <label className="custom-control-label" htmlFor="rememberMe">
                        {t("login.rememberMe")}
                      </label>
                    </div>
                    <Link href="/forgot-password" className="forgot-password-link">
                      {t("login.forgotPassword")}
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <div className="form-group">
                    <button
                      type="submit"
                      className="theme-btn btn-style-one w-100"
                      disabled={isSubmitting}
                    >
                      <span className="btn-title">
                        {isSubmitting ? "..." : t("login.loginButton")}
                      </span>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center mb-30">
                    <p className="signup-text">
                      {t("login.noAccount")}{" "}
                      <Link href="/signup" className="signup-link">
                        {t("login.signUpLink")}
                      </Link>
                    </p>
                  </div>

                </form>

                {/* Back to Home */}
                <div className="text-center mt-30">
                  <Link href="/" className="back-home-link">
                    <i className="fa fa-arrow-left mr-2"></i>
                    {t("login.backToHome")}
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

export default LoginPage;
