import React, { useState } from 'react';
import Modal from './modal';
import { useMutation } from '@apollo/client';
import { GET_ITEMS } from '../graphql/queries/ticket';
import { DELETE_ITEM, EDIT_ITEM } from '../graphql/mutations/ticket';

export default function TicketCard({ ticket }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [newItemName, setNewItemName] = useState(ticket.item_name);
  const [newItemDescription, setNewItemDescription] = useState(
    ticket.item_description
  );
  const [newItemStatus, setNewItemStatus] = useState(ticket.item_status);

  const [deleteTicket, { loading, error, data }] = useMutation(DELETE_ITEM, {
    variables: { deleteItemId: ticket.id },
    refetchQueries: [{ query: GET_ITEMS }],
  });

  const [editTicket] = useMutation(EDIT_ITEM, {
    variables: {
      editItemId: ticket.id,
      itemName: newItemName,
      itemDescription: newItemDescription,
      itemStatus: newItemStatus,
    },
    refetchQueries: [{ query: GET_ITEMS }],
  });

  const handleEditTicket = async (e) => {
    e.preventDefault();
    await editTicket();
    setShowEditModal(!showEditModal);
  };

  const handleShowEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  return (
    <>
      <div className='flex flex-col text-left transition ease-in-out border h-fit rounded-xl hover:scale-105'>
        <div className='flex flex-col h-full justify-evenly'>
          <div className='p-2'>
            <h1 className='font-bold'>{ticket.item_name}</h1>
          </div>
          <hr />
          <div className='p-2'>
            <p className='break-words'>{ticket.item_description}</p>
          </div>
          <hr />
          <div className='flex flex-row justify-between p-2'>
            {ticket.item_status === 'new' ? (
              <p className='px-2 text-white rounded-lg bg-sky-500 w-fit'>New</p>
            ) : ticket.item_status === 'in-progress' ? (
              <div className='flex flex-row space-x-2'>
                <p className='px-2 text-white bg-yellow-500 rounded-lg w-fit'>
                  In Progress
                </p>
              </div>
            ) : (
              <div className='flex flex-row space-x-2'>
                <p className='px-2 text-white bg-green-500 rounded-lg w-fit'>
                  Done
                </p>
              </div>
            )}
            <div className='flex flex-row space-x-2'>
              <div className='flex items-center px-1 bg-green-500 rounded-lg'>
                <button onClick={handleShowEditModal}>
                  <img src='https://img.icons8.com/external-anggara-flat-anggara-putra/24/undefined/external-edit-user-interface-anggara-flat-anggara-putra.png' />
                </button>
              </div>
              <div className='flex items-center px-1 bg-red-500 rounded-lg'>
                <button onClick={deleteTicket}>
                  <img src='https://img.icons8.com/external-flaticons-flat-flat-icons/24/undefined/external-delete-100-most-used-icons-flaticons-flat-flat-icons-2.png' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <div className='absolute h-screen'>
          <Modal
            title='Edit Ticket'
            submitBtnText='Save'
            shouldShow={showEditModal}
            onClose={handleShowEditModal}
          >
            <form
              onSubmit={handleEditTicket}
              className='flex flex-col space-y-2'
            >
              <div className='flex flex-col space-y-2'>
                <div>Ticket Name</div>
                <div>
                  <input
                    required
                    type='text'
                    className='w-full p-2 border rounded'
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
                <div>Ticket Description</div>
                <div>
                  <textarea
                    required
                    className='w-full p-2 border rounded'
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                  />
                </div>
                <div>Ticket Status</div>
                <div>
                  <select
                    required
                    className='w-full p-2 border rounded'
                    value={newItemStatus}
                    onChange={(e) => setNewItemStatus(e.target.value)}
                  >
                    <option value='new'>New</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='done'>Done</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='w-full p-2 text-base font-medium text-white bg-green-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300'
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
}
