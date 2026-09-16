import React from 'react'
import { useState } from 'react'
function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search courses..."
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "20px",
      }}
    />
  );
}

export default Search;

