"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import PageHead from "@/components/layout/PageHead";

interface User {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: string;
  is_active: boolean;
}

const EditUser = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const userId = params?.id as string;

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "user",
    isActive: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (currentUser && userId) {
      fetchUser();
    }
  }, [currentUser, userId]);

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

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');

      const data = await response.json();
      setUser(data.user);
      setFormData({
        fullName: data.user.full_name,
        email: data.user.email,
        phone: data.user.phone || "",
        role: data.user.role,
        isActive: data.user.is_active,
      });
    } catch (error) {
      console.error('Fetch user error:', error);
      alert('Failed to load user');
      router.push('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
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
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || 'Failed to update user' });
        return;
      }

      alert('User updated successfully!');
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Update user error:', error);
      setErrors({ submit: 'Failed to update user' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !currentUser || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHead headTitle="Edit User" />
      
      <section className="admin-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="admin-form-box">
                <div className="form-header mb-40">
                  <h2>Edit User</h2>
                  <p>Update user account details</p>
                </div>

                {user.role === 'superadmin' && (
                  <div className="alert alert-warning">
                    This is a superadmin account and cannot be modified.
                  </div>
                )}

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
                      disabled={user.role === 'superadmin'}
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
                      disabled={user.role === 'superadmin'}
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
                      disabled={user.role === 'superadmin'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role">Role *</label>
                    <select
                      id="role"
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={user.role === 'superadmin' || currentUser.role !== 'superadmin'}
                    >
                      <option value="user">User</option>
                      {currentUser?.role === 'superadmin' && (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                    <small className="form-text text-muted">
                      {currentUser?.role !== 'superadmin' && 'Only superadmin can change roles'}
                    </small>
                  </div>

                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        disabled={user.role === 'superadmin'}
                      />
                      <label className="custom-control-label" htmlFor="isActive">
                        Active Account
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="d-flex justify-content-between">
                      <Link
                        href="/admin/dashboard"
                        className="theme-btn btn-style-two"
                      >
                        <span className="btn-title">Cancel</span>
                      </Link>
                      {user.role !== 'superadmin' && (
                        <button
                          type="submit"
                          className="theme-btn btn-style-one"
                          disabled={isSubmitting}
                        >
                          <span className="btn-title">
                            {isSubmitting ? "Updating..." : "Update User"}
                          </span>
                        </button>
                      )}
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

export default EditUser;
