import React, { useState } from 'react';
import Link from 'next/link';

import Modal from './modal';

import { Grid } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFoundFilter, setIsFoundFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleShowAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const { loading, data } = useQuery(FETCH_ITEMS);

  return (
    <>
      <div className='container p-6 mx-auto'>
        <div className='flex flex-col items-center justify-center space-y-6'>
          <div className='w-full'>
            <h1 className='text-3xl font-bold'>TASK TICKETS</h1>
          </div>
          <div className='flex flex-col w-full space-y-6'>
            <div>
              <input
                type='text'
                placeholder='SEARCH ITEM...'
                className='w-full p-2 transition ease-in-out border rounded-lg active:scale-100'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex flex-col-reverse justify-between space-y-2 space-y-reverse sm:flex-row sm:space-y-0'>
              <div className='flex flex-row space-x-2'>
                <button
                  onClick={async () => {
                    await setIsFoundFilter('found');
                  }}
                  className='p-2 text-white transition ease-in-out bg-gray-500 rounded-lg active:scale-95 hover:scale-105'
                >
                  New
                </button>
                <button
                  onClick={async () => {
                    await setIsFoundFilter('not-found');
                  }}
                  className='p-2 text-white transition ease-in-out bg-yellow-500 rounded-lg active:scale-95 hover:scale-105'
                >
                  In Progress
                </button>
                <button
                  onClick={async () => {
                    await setIsFoundFilter('not-found');
                  }}
                  className='p-2 text-white transition ease-in-out bg-green-500 rounded-lg active:scale-95 hover:scale-105'
                >
                  Done
                </button>
                {isFoundFilter === 'found' || isFoundFilter === 'not-found' ? (
                  <button
                    onClick={async () => {
                      await setIsFoundFilter('');
                    }}
                    className='p-2 text-white transition ease-in-out bg-gray-500 rounded-lg active:scale-95 hover:scale-105'
                  >
                    Clear Filters
                  </button>
                ) : null}
              </div>
              <button
                onClick={handleShowAddModal}
                className='p-2 text-white transition ease-in-out bg-blue-500 rounded-lg active:scale-95 hover:scale-105'
              >
                Add Ticket
              </button>
            </div>
            {loading ? (
              <div className='flex items-center justify-center h-screen'>
                <Grid color='#00BFFF' height={100} width={100} timeout={3000} />
              </div>
            ) : (
              <div className='flex flex-col space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:space-y-0 sm:gap-8'>
                {data &&
                  data.getItems
                    .filter((item) => {
                      if (searchTerm === '') {
                        return item;
                      } else if (
                        item.item_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return item;
                      }
                      return false;
                    })
                    .filter((item) => {
                      if (isFoundFilter.toLowerCase() === 'found') {
                        if (item.item_status) return item;
                      } else if (isFoundFilter.toLowerCase() === 'not-found') {
                        if (!item.item_status) return item;
                      } else {
                        return item;
                      }
                      return false;
                    })
                    .map((item) => (
                      <Link
                        scroll={false}
                        key={item.id}
                        href={`/items/${item.id}`}
                      >
                        <a>
                          <div className='flex flex-col text-left transition ease-in-out border h-fit rounded-3xl hover:scale-105 active:scale-95'>
                            <div>
                              <img
                                className='w-full rounded-t-3xl '
                                src='https://fakeimg.pl/400x200'
                                alt='fake image thumbnail'
                              />
                            </div>
                            <div className='flex flex-col h-full justify-evenly'>
                              <div className='p-2'>
                                <h1 className='font-bold'>{item.item_name}</h1>
                              </div>
                              <hr />
                              <div className='p-2'>
                                {item.status ? (
                                  <p className='px-2 text-white bg-green-500 rounded-lg w-fit'>
                                    Found
                                  </p>
                                ) : (
                                  <div className='flex flex-row space-x-2'>
                                    <p className='px-2 text-white bg-red-500 rounded-lg w-fit'>
                                      Not Yet Found
                                    </p>
                                    <p className='px-2 text-white bg-yellow-500 rounded-lg h-ful w-fit'>
                                      With Reward
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showAddModal && (
        <Modal
          title='Add User'
          submitBtnText='Send Invite'
          shouldShow={showAddModal}
          onClose={handleShowAddModal}
        >
          <div>First Name</div>
          <div>
            <input
              type='text'
              name='firstName'
              className='w-full p-2 border rounded'
            />
          </div>
          <div>Last Name</div>
          <div>
            <input
              type='text'
              name='lastName'
              className='w-full p-2 border rounded'
            />
          </div>
          <div>Email Address</div>
          <div>
            <input
              type='email'
              name='firstName'
              className='w-full p-2 border rounded'
            />
          </div>
          <div>
            <input type='checkbox' name='isAdmin' className='border rounded' />
            <label> Administrator</label>
          </div>
        </Modal>
      )}
    </>
  );
}

const FETCH_ITEMS = gql`
  query GetItems {
    getItems {
      id
      owner
      owner_number
      item_name
      item_description
      item_status
    }
  }
`;
