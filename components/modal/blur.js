import React from 'react';

export default function Blur({ onClose }) {
  return (
    <div
      onClick={onClose}
      className='fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50'
    ></div>
  );
}
