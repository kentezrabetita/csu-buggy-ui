import React from 'react';
import Blur from './blur';

export default function Modal({ title, children, shouldShow, onClose }) {
  if (!shouldShow) {
    return null;
  }

  return (
    <>
      <Blur onClose={onClose} />
      <div className='fixed top-0 bottom-0 left-0 right-0 items-center justify-center p-5 mx-auto my-auto transition ease-in-out bg-white border rounded-md shadow-lg h-fit w-96'>
        <h1 className='font-bold text-md'>{title}</h1>
        <div className='flex flex-col w-full mt-3 space-y-2 text-left'>
          {children}
        </div>
      </div>
    </>
  );
}
