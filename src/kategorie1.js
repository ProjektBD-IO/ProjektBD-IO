import React, { useState } from 'react';

function Cat({ categories, onChange }) {
  return (
    <select
      defaultValue=""
      onChange={e => {
        const category = e.target.value;
        if (category) {
          fetch(`http://localhost:8889/search/category/${category}`)
            .then(response => response.json())
            .then(data => onChange(data))
            .catch(error => console.error(error));
        } else {
          onChange([]);
        }
      }}
    >
      <option value="">--Wybierz kategorię--</option>
      {categories.map(category => (
        <option key={category} value={category} style={{ color:'white'}}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default Cat;