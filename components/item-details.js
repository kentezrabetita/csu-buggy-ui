import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Grid } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function ItemDetailLayout({ id }) {
  const [itemDetails, setItemDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getItemDetails = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/` + id
    );
    setItemDetails(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <Grid color='#00BFFF' height={100} width={100} timeout={3000} />
        </div>
      ) : (
        <>
          <div className='container flex flex-col h-screen p-6 mx-auto space-y-3 lg:flex-row lg:space-y-0 lg:items-center lg:space-x-8'>
            <div className='lg:w-full'>
              <img
                className='w-full transition ease-in-out rounded-3xl lg:rounded-3xl active:scale-95 hover:scale-105'
                src='https://fakeimg.pl/400x200'
                alt='fake image thumbnail'
              />
            </div>
            <div className='flex flex-col p-6 space-y-4 lg:w-full'>
              <div>
                <h1 className='text-lg font-bold'>{itemDetails.title}</h1>
              </div>
              <div>
                {itemDetails.completed ? (
                  <p className='px-2 text-white bg-green-500 rounded-lg h-ful w-fit'>
                    Found
                  </p>
                ) : (
                  <p className='px-2 text-white bg-red-500 rounded-lg h-ful w-fit'>
                    Not Yet Found
                  </p>
                )}
              </div>
              <div>
                {itemDetails.completed ? (
                  <p className='px-2 text-white bg-orange-500 rounded-lg h-ful w-fit'>
                    Reward 5000 PHP was given to the founder
                  </p>
                ) : (
                  <p className='px-2 text-white bg-yellow-500 rounded-lg h-ful w-fit'>
                    Reward 5000 PHP will be given
                  </p>
                )}
              </div>
              <div>
                <p className='text-gray-500'>Owner: Jeol P. West</p>
              </div>
              <div>
                <p className='text-gray-500'>Contact: 09123456789</p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                {itemDetails.completed ? null : (
                  <button className='w-full p-2 text-white transition ease-in-out bg-green-500 rounded-lg active:scale-95 hover:scale-105'>
                    FOUND
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
