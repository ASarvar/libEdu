"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/layout/PageHead";

const CreateUser = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (data.user.role !== 'admin' && data.user.role !== 'superadmin') {
        router.push('/profile');
        return;
      }

      setCurrentUser(data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || 'Failed to create user' });
        return;
      }

      alert('User created successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Create user error:', error);
      setErrors({ submit: 'Failed to create user' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHead headTitle={t('admin.createUser') || 'Create User'} />
      
      <section className="admin-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="admin-form-box">
                <div className="form-header mb-40">
                  <h2>{t('admin.createUser') || 'Create New User'}</h2>
                  <p>Fill in the details to create a new user account</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  {errors.submit && (
                    <div className="alert alert-danger">{errors.submit}</div>
                  )}

                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="+998 (__) ___-__-__"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Enter password (min 8 characters)"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Role *</label>
                    <select
                      id="role"
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="user">User</option>
                      {currentUser?.role === 'superadmin' && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                    <small className="form-text text-muted">
                      {currentUser?.role !== 'superadmin' && 'Only superadmin can create admin users'}
                    </small>
                  </div>

                  <div className="form-group">
                    <div className="d-flex justify-content-between">
                      <Link
                        href="/admin/dashboard"
                        className="theme-btn btn-style-two"
                      >
                        <span className="btn-title">Cancel</span>
                      </Link>
                      <button
                        type="submit"
                        className="theme-btn btn-style-one"
                        disabled={isSubmitting}
                      >
                        <span className="btn-title">
                          {isSubmitting ? "Creating..." : "Create User"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateUser;
