import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { updateNote } from '../backend/api';
import Loader from './utilities/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  content: {
    inset: '50px',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    width: 'auto',
    maxWidth: '90vh',
    height: '40vh',
    margin: '0 auto',
    overflow: 'auto',
    background: '#fff',
    boxShadow: '0 2px 10px 1px rgba(0, 0, 0, 0.15)',
  },
};

const EditModal = ({ isOpen, closeModal, note, saveNote, isSubmitting }) => {
  const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    saveNote({
      id: note.id,
      ...data,
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Edit Note Modal">
      <div className="px-5 pt-0 flex flex-shrink-0 items-center justify-between border-top-left-radius-md border-top-right-radius-md">
        <h4 className="mb-0 lh-150">Edit Note</h4>
        <button type="button" className="btn border-none fill-close-btn" aria-label="Close" onClick={closeModal}>
          <FontAwesomeIcon icon={faCircleXmark} className="fa-regular text-xl text-gray-900" />
        </button>
      </div>
      <div className="px-16 pt-15 relative flex-1 flex-grow-1 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center">
            <input type="hidden" {...register('id', { required: true })} />
            <input
              type="text"
              className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
              id="title"
              placeholder="Edit Title"
              {...register('title')}
            />
            <textarea
              className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
              id="description"
              placeholder="Edit Description"
              {...register('description')}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center p-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${
                isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? <Loader /> : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
