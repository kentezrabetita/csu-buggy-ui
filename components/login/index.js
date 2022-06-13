import React from 'react';
import Link from 'next/link';

export default function Login() {
  return (
    <div className='container mx-auto'>
      <div className='flex items-center justify-center h-screen'>
        <form className='w-full px-6 max-w-sm'>
          <div className='flex flex-col space-y-6 bg-purple-500 w-full p-6 rounded-lg'>
            <div>
              <h1 className='text-white text-center text-3xl font-bold'>
                ADMIN LOGIN
              </h1>
            </div>
            <div>
              <input
                type='text'
                name='username'
                placeholder='USERNAME'
                className='p-4 border rounded-lg w-full'
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='PASSWORD'
                className='p-4 border rounded-lg w-full'
              />
            </div>
            <div>
              <Link href='/dashboard'>
                <a>
                  <button className='p-4 bg-white rounded-lg w-full'>
                    LOGIN
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
