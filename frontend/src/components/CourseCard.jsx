import React from 'react';

// Props are received as an object in the function parameter
function CourseCard({ title, category, instructor, price ,isFeatued}) {
  return (
    <div style={{
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      padding: '20px',
      width: '260px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>

      
      <span style={{
        fontSize: '0.8rem',
        backgroundColor: '#e0f2fe',
        color: '#0369a1',
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        {category}
      </span>
      <h3 style={{ margin: '12px 0 8px 0', color: '#0f172a' }}>{title}</h3>
      <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '0.9rem' }}>
        Instructor: {instructor}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#16a34a' }}>
          ${price}
        </span>
        <button style={{
          backgroundColor: '#0284c7',
          color: '#ffffff',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Enroll
        </button>
      </div>
    </div>
  );
}

export default CourseCard;