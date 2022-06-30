import React, { useState } from 'react';
import TicketCard from './ticket';
import Modal from './modal';

import { Grid } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import toast, { Toaster } from 'react-hot-toast';

import { GET_ITEMS } from '../graphql/queries/ticket';
import { ADD_ITEM } from '../graphql/mutations/ticket';
import { useQuery, useMutation } from '@apollo/client';

export default function Dashboard() {
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [isFoundFilter, setIsFoundFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [addTicket] = useMutation(ADD_ITEM, {
    variables: {
      itemName: newItemName,
      itemDescription: newItemDescription,
      itemStatus: 'new',
    },
    refetchQueries: [{ query: GET_ITEMS }],
  });

  const handleShowAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    const promise = addTicket();
    toast.promise(promise, {
      loading: 'Adding ticket...',
      success: 'Ticket Successfully Added!',
      error: 'There was an Error!',
    });
    setShowAddModal(!showAddModal);
  };

  const { loading, data } = useQuery(GET_ITEMS);

  return (
    <>
      <Toaster />
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
                    await setIsFoundFilter('new');
                  }}
                  className='p-2 text-white transition ease-in-out rounded-lg bg-sky-500 active:scale-95 hover:scale-105'
                >
                  New
                </button>
                <button
                  onClick={async () => {
                    await setIsFoundFilter('in-progress');
                  }}
                  className='p-2 text-white transition ease-in-out bg-yellow-500 rounded-lg active:scale-95 hover:scale-105'
                >
                  In Progress
                </button>
                <button
                  onClick={async () => {
                    await setIsFoundFilter('done');
                  }}
                  className='p-2 text-white transition ease-in-out bg-green-500 rounded-lg active:scale-95 hover:scale-105'
                >
                  Done
                </button>
                {isFoundFilter === 'new' ||
                isFoundFilter === 'in-progress' ||
                isFoundFilter === 'done' ? (
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
                    .filter((ticket) => {
                      if (searchTerm === '') {
                        return ticket;
                      } else if (
                        ticket.item_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return ticket;
                      }
                      return false;
                    })
                    .filter((ticket) => {
                      if (isFoundFilter.toLowerCase() === 'new') {
                        if (ticket.item_status === isFoundFilter) return ticket;
                      } else if (
                        isFoundFilter.toLowerCase() === 'in-progress'
                      ) {
                        if (ticket.item_status === isFoundFilter) return ticket;
                      } else if (isFoundFilter.toLowerCase() === 'done') {
                        if (ticket.item_status === isFoundFilter) return ticket;
                      } else {
                        return ticket;
                      }
                      return false;
                    })
                    .map((item) => <TicketCard key={item.id} ticket={item} />)}
              </div>
            )}
          </div>
        </div>
      </div>
      {showAddModal && (
        <Modal
          title='Add Ticket'
          submitBtnText='Send Invite'
          shouldShow={showAddModal}
          onClose={handleShowAddModal}
        >
          <form onSubmit={handleAddTicket}>
            <div>Ticket Name</div>
            <div>
              <input
                required
                type='text'
                className='w-full p-2 border rounded'
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>
            <div>Ticket Description</div>
            <div>
              <textarea
                required
                type='text'
                className='w-full p-2 border rounded'
                onChange={(e) => setNewItemDescription(e.target.value)}
              />
            </div>
            <div className='pt-2'>
              <button
                type='submit'
                className='w-full p-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300'
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
