"use client";

import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceFilter = () => {
  const [price, setPrice] = useState<number[]>([0, 1000]);

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPrice(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Selected Price Range: ${price[0]} - ${price[1]}`);
  };

  return (
    <div className="range-slider">
        <Slider
          range
          min={0}
          max={2000}
          value={price}
          onChange={handlePriceChange}
          allowCross={false}
        />
        <form onSubmit={handleSubmit} className='align-items-center'>
          <input
            type="text"
            className="property-amount"
            name="field-name"
            value={`$${price[0]} - $${price[1]}`}
            readOnly
          />
          <input type="submit" value="Filter" />
        </form>
    </div>
  );
};

export default PriceFilter;
