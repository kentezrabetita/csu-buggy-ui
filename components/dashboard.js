import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getAllItems = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );
    setItems(response.data);
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className='container h-screen p-6 mx-auto'>
      <div className='flex flex-col items-center justify-center space-y-6 text-center'>
        <div className='w-full'>
          <h1 className='text-3xl font-bold'>LOST & FOUND</h1>
        </div>
        <div className='flex flex-col w-full space-y-6'>
          <div>
            <input
              type='text'
              placeholder='SEARCH ITEM...'
              className='w-full p-2 border rounded-lg'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex flex-col space-y-2 lg:flex-row md:grid md:grid-cols-2 xl:grid-cols-3 md:space-y-0 md:gap-8'>
            {items
              .filter((item) => {
                if (searchTerm === '') {
                  return item;
                } else if (
                  item.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
                return false;
              })
              .map((item) => (
                <div
                  className='flex flex-col p-6 text-center border rounded-lg'
                  key={item.id}
                >
                  <div className='flex flex-col space-y-2'>
                    <p className='text-2xl'>{item.title}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    {item.completed ? (
                      <p className='text-white bg-green-500 rounded-lg'>
                        Found
                      </p>
                    ) : (
                      <p className='text-white bg-red-500 rounded-lg'>
                        Not Yet Found
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
