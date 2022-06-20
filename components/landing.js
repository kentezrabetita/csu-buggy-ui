import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='flex flex-col justify-start h-screen p-6 space-y-24'>
      <div className='container flex flex-row items-center justify-between p-6 mx-auto'>
        <div>
          <h1 className='text-2xl font-bold'>Buggy 🪲</h1>
        </div>
        <div>
          <Link href='/items'>
            <a>
              <buton className='p-2 px-4 text-xl text-white bg-yellow-500 rounded-3xl'>
                Get Started
              </buton>
            </a>
          </Link>
        </div>
      </div>

      <div className='flex flex-col-reverse items-center space-y-10 space-y-reverse lg:flex-row lg:space-y-0'>
        <div className='flex flex-col items-center justify-center w-full space-y-8 text-center'>
          <div>
            <h1 className='text-3xl font-bold text-center lg:text-7xl'>
              Keep track of bugs and cracks!
            </h1>
          </div>
          <div>
            <Link href='/items'>
              <a>
                <button className='p-2 px-4 text-xl text-white bg-yellow-500 rounded-3xl'>
                  Start managing now!
                </button>
              </a>
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center w-full'>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 lg:gap-4'>
            <div className='p-10 bg-red-500 lg:p-28 rounded-3xl'></div>
            <div className='p-10 bg-blue-500 lg:p-28 rounded-3xl'></div>
            <div className='p-10 bg-green-500 lg:p-28 rounded-3xl'></div>
            <div className='p-10 bg-yellow-500 lg:p-28 rounded-3xl'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
