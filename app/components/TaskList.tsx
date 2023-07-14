'use client';
import DateComponent from './date/DateComponent';
import TaskFilter from './filter/TaskFilter';
import {addNote, deleteNote, getNotes, updateNote} from '../backend/api'
import { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import Loader from './utilities/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPencil, faPencilSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

// Modal Styles
const customStyles = {
    content: {
      inset: '50px',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      width: 'auto',
      maxWidth: '90vh',
      height: '40vh',
      //maxHeight: 'calc(100vh - 100px)',
      margin: '0 auto',
      overflow: 'auto',
      background: '#fff',
      boxShadow: '0 2px 10px 1px rgba(0, 0, 0, 0.15)',
    },
  };

export default function TaskList() {
  const {register, handleSubmit, reset, setValue, formState: {isSubmitting}} = useForm();
  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalNote, setModalNote] = useState<any | null>(null);
  
  function GetNotes() {
      getNotes().then((notes:any) => {
          setNotes(notes);
      });
  }

  useEffect(() => {
      GetNotes();
  }, [isSubmitting]);
  
  //update modal fields with help of setValue from react-hook-form
  useEffect(() => {
    if (modalNote) {
      setValue('id', modalNote.id);
      setValue('title', modalNote.title);
      setValue('description', modalNote.description);
    }
  }, [modalNote, setValue]);

  const onSubmit = async (note: object) => {
    await addNote(note);
    reset();
  }

  const removeNote = async (id: number) => {
      await deleteNote(id);
      GetNotes();
  }

  //Edit Modal related
  const openModal = (note: object) => {
    setModalNote(note);
    setModalIsOpen(true);
  };
    
  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  const saveNote = async (note: object) => {
    await updateNote(note);
    reset();
    closeModal();
  };

    return (
        <>
            <div className="container">
                <DateComponent />
                <TaskFilter />
                <div className="clear-both"></div>
                {notes.length !== 0 ? <ul>
                    {notes.map((note:any) => (
                        <li key={note?.id}>{note?.title}
                            <button
                        className={`btn border-none fill-close-btn`}
                        onClick={() => openModal(note)}
                        >
                        <FontAwesomeIcon icon={faPencil} className="text-xs"/>
                        </button>
                            <button
                        className={`btn border-none fill-close-btn`}
                        onClick={() => removeNote(note?.id)}
                        >
                        <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500"/>
                        </button>
                        </li>
                    ))}
                </ul> : <Loader/>}
                
          <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='Title' {...register("title", {required: true})}/>
                
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder='Description' {...register("description", {required: true})}/>
                
                    <button type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                        >
                        {isSubmitting ?
                                <Loader/>
                            : "Submit"}
                    </button>
                </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Note Modal"
      >
        <div className="px-5 pt-0 flex flex-shrink-0 items-center justify-between border-top-left-radius-md border-top-right-radius-md">
          <h4 className="mb-0 lh-150">Edit Note</h4>
          <button
            type="button"
            className="btn border-none fill-close-btn"
            aria-label="Close"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faCircleXmark} className="fa-regular text-xl text-gray-900"/>
          </button>
        </div>
        <div className="px-16 pt-15 relative flex-1 flex-grow-1 mt-4">
          <form onSubmit={handleSubmit(saveNote)}>
                <div className="flex flex-col items-center">
                <input type='hidden' {...register("id", {required: true})}/>
              <input
                type="text"
                className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
                    id="title"
                placeholder="Edit Title"
                {...register("title")}
              />
              <textarea
                className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
                    id="description"
                placeholder="Edit Description"
                {...register("description")}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center p-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${
                  isSubmitting ? "cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? <Loader /> : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
                
            </div>
        </>
    );
}