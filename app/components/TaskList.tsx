'use client';
import DateComponent from './date/DateComponent';
import TaskFilter from './filter/TaskFilter';
//import {addNote, deleteNote, getNotes, updateNote} from '../backend/api'
import { useEffect, useState } from 'react';
import {useForm} from "react-hook-form";
import Loader from './utilities/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleCheck, faCircleXmark, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle, faCircleXmark as faRegularCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Modal from 'react-modal';
import { observer } from 'mobx-react';
import store from '../mobx/store';

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

const TaskList= observer(() => {
  const { register: addNoteRegister, handleSubmit: addNoteSubmit, reset: addNoteReset, formState: { isSubmitting: addNoteSubmitting } } = useForm();
  const { register: updateNoteRegister, handleSubmit: updateNoteSubmit, reset: updateNoteReset, setValue, formState: { isSubmitting: updateNoteSubmitting } } = useForm();
  const { notes, fetchNotes, createNote, deleteNote, updateNote } = store;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalNote, setModalNote] = useState<any | null>(null);
  //const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemsRadio, setHoveredItemsRadio] = useState({});
  const [hoveredItemsDelete, setHoveredItemsDelete] = useState({});

  // useEffect(() => {
  //     GetNotes();
  // }, [isSubmitting]);

  useEffect(() => {
    fetchNotes();
  }, []);
  
  //update modal fields with help of setValue from react-hook-form
  useEffect(() => {
    if (modalNote) {
      setValue('id', modalNote.id);
      setValue('title', modalNote.title);
      setValue('description', modalNote.description);
    }
  }, [modalNote, setValue]);

  const onSubmit = async (note: object) => {
    await createNote(note);
    addNoteReset();
    fetchNotes();
  }

  const removeNote = async (id: number) => {
      await deleteNote(id);
      fetchNotes();
  }

  const setStatus = async (note: any) => {
    await updateNote(note);
    fetchNotes();
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
    updateNoteReset();
    fetchNotes();
    closeModal();
  };

  const handleMouseEnterRadio = (itemId: number) => {
    setHoveredItemsRadio((prevHoveredItemsRadio) => ({
      ...prevHoveredItemsRadio,
      [itemId]: true,
    }));
  };

  const handleMouseLeaveRadio = (itemId:number) => {
    setHoveredItemsRadio((prevHoveredItemsRadio) => ({
      ...prevHoveredItemsRadio,
      [itemId]: false,
    }));
  };

  const handleMouseEnterDelete = (itemId: number) => {
    setHoveredItemsDelete((prevHoveredItemsDelete) => ({
      ...prevHoveredItemsDelete,
      [itemId]: true,
    }));
  };

  const handleMouseLeaveDelete = (itemId:number) => {
    setHoveredItemsDelete((prevHoveredItemsDelete) => ({
      ...prevHoveredItemsDelete,
      [itemId]: false,
    }));
  };

    return (
        <>
            <div className="container">
                <DateComponent />
                <TaskFilter />
          <div className="clear-both"></div>
          <div className='mt-5 relative flex flex-col min-w-0 h-card-height bg-card-bg border-card-border-width border-card-border-color rounded-card-border-radius'>
          {notes.length !== 0
            ?
            <ul className="flex flex-col p-0 mb-0 border-list-group-border-color rounded-list-group-border-radius">
              {notes.map((note:any) => (
                <li
                  className="flex !important relative py-2 px-4 bg-white hover:z-[2] hover:shadow-[0_3px_6px_1px_#00000026] hover:rounded-[5px]"
                  key={note?.id}
                >
                  <button
                    type="button"
                    className="btn px-0 border-none"
                    
                  >
                    {note?.status === 'in-progress' ? 
                      <FontAwesomeIcon
                        icon={hoveredItemsRadio[note?.id] ? faCircle : faRegularCircle}
                        onClick={() => {
                          note.status = "completed";
                          setStatus(note);
                        }}
                        onMouseEnter={() => handleMouseEnterRadio(note?.id)}
                        onMouseLeave={() => handleMouseLeaveRadio(note?.id)}
                        className="text-gray-300 text-xl transition-colors duration-300 hover:text-gray-500"
                      />
                      : 
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        onClick={() => {
                          note.status = "in-progress";
                          setStatus(note);
                        }}
                        className="text-gray-300 text-xl transition-colors duration-300 hover:text-gray-500"
                      />
                    }
                    
                  </button>
                  <label
                    className={`form-check-label ms-2 ${note?.status === 'completed' ? 'line-through' : ''}`}
                  >
                    {note?.title}
                  </label>
                  {note?.status === 'in-progress' && 
                    <button
                      className={`btn border-none fill-close-btn`}
                      onClick={() => openModal(note)}
                      >
                      <FontAwesomeIcon icon={faPencil} className="text-xs"/>
                    </button>
                  }
                      <button
                  className={`btn border-none fill-close-btn`}
                  onClick={() => removeNote(note?.id)}
                  >
                    <FontAwesomeIcon
                      icon={hoveredItemsDelete[note?.id] ? faCircleXmark : faRegularCircleXmark}
                      className="text-xl text-red-500 transition-colors duration-300 hover:text-red-500"
                      onMouseEnter={() => handleMouseEnterDelete(note?.id)}
                      onMouseLeave={() => handleMouseLeaveDelete(note?.id)}
                    />
                  </button>
                  </li>
              ))}
            </ul>
            :
            <Loader />
            }
          </div>
                
          <form onSubmit={addNoteSubmit(onSubmit)}>
            <input type='hidden' {...addNoteRegister("id", { required: true })} value={0} />
            <input type='hidden' {...addNoteRegister("status", {required: true})} value={"in-progress"}/>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder='Title' {...addNoteRegister("title", {required: true})}/>
                
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder='Description' {...addNoteRegister("description", {required: true})}/>
                
                    <button type="submit"
                        disabled={addNoteSubmitting}
                        className={`inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${addNoteSubmitting ? 'cursor-not-allowed' : ''}`}
                        >
                        {addNoteSubmitting ?
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
          <form onSubmit={updateNoteSubmit(saveNote)}>
                <div className="flex flex-col items-center">
                <input type='hidden' {...updateNoteRegister("id", {required: true})}/>
              <input
                type="text"
                className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
                    id="title"
                placeholder="Edit Title"
                {...updateNoteRegister("title")}
              />
              <textarea
                className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
                    id="description"
                placeholder="Edit Description"
                {...updateNoteRegister("description")}
              />
              <button
                type="submit"
                disabled={updateNoteSubmitting}
                className={`inline-flex items-center p-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${
                  updateNoteSubmitting ? "cursor-not-allowed" : ""
                }`}
              >
                {updateNoteSubmitting ? <Loader /> : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
                
            </div>
    </>
    )
});
    
export default TaskList;