"use client";

import Link from "next/link";
import { useState } from "react";

const ShopCheckout1 = () => {
  const [activeKey, setActiveKey] = useState<number | null>(1);

  const handleClick = (key: number) => {
    setActiveKey((prev) => (prev === key ? null : key));
  };

  return (
    <section>
      <div className="container">
        <div className="section-content">
          <form id="checkout-form" action="/" method="POST">
            <div className="row mt-30">

              {/* Billing Details */}
              <div className="col-md-6">
                <div className="billing-details">
                  <h3 className="mb-30">Billing Details</h3>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="Fname">First Name</label>
                      <input id="Fname" name="Fname" type="text" className="form-control" placeholder="First Name" required />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="Lname">Last Name</label>
                      <input id="Lname" name="Lname" type="text" className="form-control" placeholder="Last Name" required />
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="Cname">Company Name</label>
                        <input id="Cname" name="Cname" type="text" className="form-control" placeholder="Company Name" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Eaddress">Email Address</label>
                        <input id="Eaddress" name="Eaddress" type="email" className="form-control" placeholder="Email Address" required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="Saddress">Address</label>
                        <input id="Saddress" name="Saddress" type="text" className="form-control" placeholder="Street address" required />
                      </div>
                      <div className="mb-3">
                        <input type="text" name="Apartment" className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                      </div>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="stateCity">City</label>
                      <input id="stateCity" name="City" type="text" className="form-control" placeholder="City" required />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="Sprovince">State/Province</label>
                      <input id="Sprovince" name="Sprovince" type="text" className="form-control" placeholder="State/Province" required />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="ZCode">Zip/Postal Code</label>
                      <input id="ZCode" name="ZCode" type="text" className="form-control" placeholder="Zip/Postal Code" required />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="Fcountry">Country</label>
                      <select id="Fcountry" name="Fcountry" className="form-control" required>
                        <option value="">Select Country</option>
                        <option>Australia</option>
                        <option>UK</option>
                        <option>USA</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="col-md-6">
                <h3>Additional Information</h3>
                <label htmlFor="Ocomments">Order notes <span className="optional">(optional)</span></label>
                <textarea id="Ocomments" name="Ocomments" className="form-control" placeholder="Notes about your order, e.g. special notes for delivery." rows={3}></textarea>
              </div>

              {/* Order Summary */}
              <div className="col-md-12 mt-30">
                <h3>Your Order</h3>
                <table className="table table-striped table-bordered tbl-shopping-cart">
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Product Name</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-thumbnail">
                        <Link href="/shop-product-details"><img alt="product" src="/images/resource/products/1.jpg" /></Link>
                      </td>
                      <td className="product-name"><Link href="/shop-product-details">Headphone</Link> x 2</td>
                      <td><span className="amount">$36.00</span></td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <Link href="/shop-product-details"><img alt="product" src="/images/resource/products/2.jpg" /></Link>
                      </td>
                      <td className="product-name"><Link href="/shop-product-details">Luggage</Link> x 3</td>
                      <td><span className="amount">$115.00</span></td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <Link href="/shop-product-details"><img alt="product" src="/images/resource/products/3.jpg" /></Link>
                      </td>
                      <td className="product-name"><Link href="/shop-product-details">Watch</Link> x 1</td>
                      <td><span className="amount">$68.00</span></td>
                    </tr>
                    <tr>
                      <td>Cart Subtotal</td>
                      <td></td>
                      <td>$180.00</td>
                    </tr>
                    <tr>
                      <td>Shipping and Handling</td>
                      <td></td>
                      <td>Free Shipping</td>
                    </tr>
                    <tr>
                      <td>Order Total</td>
                      <td></td>
                      <td>$250.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-12 mt-60">
                <div className="payment-method">
                  <h3>Choose a Payment Method</h3>
                  <ul className="accordion-box">

                    {/* Card Payment */}
                    <li className="accordion block">
                      <div
                        className={`acc-btn ${activeKey === 1 ? "active" : ""}`}
                        onClick={() => handleClick(1)}
                      >
                        <div className="icon-outer">
                          <i className="lnr-icon-chevron-down"></i>
                        </div>
                        Credit Card / Debit Card
                      </div>
                      {activeKey === 1 && (
                        <div className="acc-content current">
                          <div className="payment-info">
                            <div className="row clearfix">
                              <div className="col-lg-6 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Cname"
                                  placeholder="Name on the Card"
                                  required
                                />
                              </div>
                              <div className="col-lg-6 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Cnumber"
                                  placeholder="Card Number"
                                  required
                                />
                              </div>
                              <div className="col-lg-3 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Edate"
                                  placeholder="Expiry Date"
                                  required
                                />
                              </div>
                              <div className="col-lg-3 mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Scode"
                                  placeholder="Security Code"
                                  required
                                />
                              </div>
                              <div className="col-lg-6">
                                <button
                                  type="submit"
                                  className="theme-btn btn-style-one rounded-0 btn-two"
                                >
                                  <span className="btn-title">Make Payment</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </li>

                    {/* Bank Transfer */}
                    <li className="accordion block">
                      <div
                        className={`acc-btn ${activeKey === 2 ? "active" : ""}`}
                        onClick={() => handleClick(2)}
                      >
                        <div className="icon-outer">
                          <i className="lnr-icon-chevron-down"></i>
                        </div>
                        Direct Bank Transfer
                      </div>
                      {activeKey === 2 && (
                        <div className="acc-content current">
                          <div className="payment-info">
                            <p className="mb-0">
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order won’t be shipped until the funds have
                              cleared in our account.
                            </p>
                          </div>
                        </div>
                      )}
                    </li>

                    {/* Cheque Payment */}
                    <li className="accordion block">
                      <div
                        className={`acc-btn ${activeKey === 3 ? "active" : ""}`}
                        onClick={() => handleClick(3)}
                      >
                        <div className="icon-outer">
                          <i className="lnr-icon-chevron-down"></i>
                        </div>
                        Cheque Payment
                      </div>
                      {activeKey === 3 && (
                        <div className="acc-content current">
                          <div className="payment-info">
                            <p className="mb-0">
                              Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.
                            </p>
                          </div>
                        </div>
                      )}
                    </li>

                    {/* Other Payment */}
                    <li className="accordion block">
                      <div
                        className={`acc-btn ${activeKey === 4 ? "active" : ""}`}
                        onClick={() => handleClick(4)}
                      >
                        <div className="icon-outer">
                          <i className="lnr-icon-chevron-down"></i>
                        </div>
                        Other Payment
                      </div>
                      {activeKey === 4 && (
                        <div className="acc-content current">
                          <div className="payment-info">
                            <p className="mb-0">
                              Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.
                            </p>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ShopCheckout1;
