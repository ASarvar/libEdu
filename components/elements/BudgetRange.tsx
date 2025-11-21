"use client";

import React, { useState } from 'react';
import Slider from 'react-slider';

const BudgetRange = () => {
  const [value, setValue] = useState([0, 1500]);

  return (
    <div className="form-group col-lg-12">
      <label>Budget Range</label>
      <div className="range-slider-one">
        <input
          type="text"
          className="range-amount"
          value={`$${value[0]} - $${value[1]}`}
          readOnly
        />
        <Slider
          className="distance-range-slider"
          value={value}
          onChange={setValue}
          min={0}
          max={2000}
          step={1}
          pearling
          minDistance={10}
        />
      </div>
    </div>
  );
};

export default BudgetRange;
