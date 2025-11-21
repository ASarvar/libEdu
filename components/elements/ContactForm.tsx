"use client";

import React, { useState, FormEvent } from 'react';
import BudgetRange from '../elements/BudgetRange'

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const formData = new FormData(e.currentTarget);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (response.ok) {
                setSubmitStatus('success');
                e.currentTarget.reset();
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>

            <div className="contact-form wow fadeInLeft">
                <div className="bg bg-pattern-1"></div>
                <h3 className="title">Request A Quote</h3>

                {/* Contact Form */}
                <form method="post" onSubmit={handleSubmit} id="contact-form">
                    <div className="row">
                        <div className="form-group col-lg-6 col-md-6">
                            <input type="text" name="first_name" placeholder="First Name" required disabled={isSubmitting} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <input type="text" name="last_name" placeholder="Last Name" required disabled={isSubmitting} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <input type="email" name="email" placeholder="Email" required disabled={isSubmitting} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <input type="tel" name="phone" placeholder="Phone" required disabled={isSubmitting} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <input type="text" name="company" placeholder="Company" required disabled={isSubmitting} />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                            <input type="text" name="address" placeholder="Address" required disabled={isSubmitting} />
                        </div>
                        <div className="form-group col-lg-12">
                            <BudgetRange />
                        </div>
                        <div className="form-group col-lg-12">
                            <textarea name="message" placeholder="Message" required disabled={isSubmitting} defaultValue={""} />
                        </div>

                        {submitStatus === 'success' && (
                            <div className="form-group col-lg-12">
                                <div className="alert alert-success" role="alert">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="form-group col-lg-12">
                                <div className="alert alert-danger" role="alert">
                                    Sorry, something went wrong. Please try again later.
                                </div>
                            </div>
                        )}

                        <div className="form-group col-lg-12">
                            <button type="submit" className="theme-btn btn-style-one hvr-light" disabled={isSubmitting}>
                                <span className="btn-title">
                                    {isSubmitting ? 'SENDING...' : 'SUBMIT REQUEST'}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;