'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import DateComponent from '../date/DateComponent';
import TaskFilter from '../filter/TaskFilter';
import Loader from '../utilities/Loader';
import TaskItem from './TaskItem';
import NoteModal from './NoteModal';
import store from '../../mobx/store';

const TaskList = observer(() => {
  const { notes, fetchNotes, createNote, deleteNote, updateNote, error, clearError } = store;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalNote, setModalNote] = useState<any | null>(null);
  const [hoveredItemsRadio, setHoveredItemsRadio] = useState({});
  const [hoveredItemsDelete, setHoveredItemsDelete] = useState({});
  const [hoveredItemsView, setHoveredItemsView] = useState({});
  const [hoveredModalCloseIcon, setHoveredModalCloseIcon] = useState(false);
  const { register: addNoteRegister, handleSubmit: addNoteSubmit, reset: resetAddNote, formState: { isSubmitting: addNoteSubmitting } } = useForm();
  const { register: updateNoteRegister, handleSubmit: updateNoteSubmit, setValue, formState: { isSubmitting: updateNoteSubmitting } } = useForm();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const onSubmit = async (note: any) => {
    const response = await createNote(note);
    if (response) {
      resetAddNote();
      fetchNotes();
    }
  };

  const removeNote = async (id: number) => {
    const response = await deleteNote(id);
    if (response) {
      fetchNotes();
    }
  };

  const setStatus = async (note: any, status: string) => {
    const response = await updateNote(note, status);
    if (response) {
      fetchNotes();
    }
  };

  const openModal = (note: any) => {
    setModalNote(note);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveNote = async (note: any) => {
    const response = await updateNote(note, note.status);
    closeModal();
    if (response) {
      fetchNotes();
    }
  };

  const dismissError = () => {
    clearError();
  };

  //change icons style on mouse hover
  const handleMouseEnterRadio = (itemId: number) => {
    setHoveredItemsRadio((prevHoveredItemsRadio) => ({
      ...prevHoveredItemsRadio,
      [itemId]: true,
    }));
  };

  const handleMouseLeaveRadio = (itemId: number) => {
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

  const handleMouseLeaveDelete = (itemId: number) => {
    setHoveredItemsDelete((prevHoveredItemsDelete) => ({
      ...prevHoveredItemsDelete,
      [itemId]: false,
    }));
  };

  const handleMouseEnterView = (itemId: number) => {
    setHoveredItemsView((prevHoveredItemsView) => ({
      ...prevHoveredItemsView,
      [itemId]: true,
    }));
  };

  const handleMouseLeaveView = (itemId: number) => {
    setHoveredItemsView((prevHoveredItemsView) => ({
      ...prevHoveredItemsView,
      [itemId]: false,
    }));
  };

  return (
    <>
      <div className="container">
        <DateComponent />
        <TaskFilter />
        <div className="clear-both"></div>
        {error && (
          <div className="p-4 bg-red-500 text-white rounded mb-4 mt-4">
            <p>{error}</p>
            <button className="mt-2 px-4 py-2 bg-white text-red-500 rounded border border-red-500 hover:bg-red-500 hover:text-white" onClick={dismissError}>
              Dismiss
            </button>
          </div>
        )}
        <div className="mt-5 relative flex flex-col">
          {notes.length !== 0 ? (
            <ul className="flex flex-col p-0 mb-0 border-list-group-border-color rounded-list-group-border-radius">
              {notes.map((note: any) => (
                <TaskItem
                  key={note.id}
                  note={note}
                  hoveredItemsRadio={hoveredItemsRadio}
                  hoveredItemsDelete={hoveredItemsDelete}
                  hoveredItemsView={hoveredItemsView}
                  handleMouseEnterRadio={handleMouseEnterRadio}
                  handleMouseLeaveRadio={handleMouseLeaveRadio}
                  handleMouseEnterDelete={handleMouseEnterDelete}
                  handleMouseLeaveDelete={handleMouseLeaveDelete}
                  handleMouseEnterView={handleMouseEnterView}
                  handleMouseLeaveView={handleMouseLeaveView}
                  openModal={openModal}
                  removeNote={removeNote}
                  setStatus={setStatus}
                />
              ))}
              <li className="flex items-center justify-between py-2 px-4 bg-white hover:z-[1] hover:shadow-[0_3px_6px_1px_#00000026] hover:rounded-[5px]">
                <div className="flex items-center">
                  <button type="button" className="btn px-0 border-none">
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      className="text-xl text-blue-500 transition-colors duration-300 hover:text-blue-500"
                    />
                  </button>
                  <form onSubmit={addNoteSubmit(onSubmit)}>
                    <input type="hidden" {...addNoteRegister('id', { required: true })} value={0} />
                    <input type="hidden" {...addNoteRegister('status', { required: true })} value={'in-progress'} />
                    <input
                      type="text"
                      placeholder="Add Title"
                      className="border-none !outline-none xs:w-24 lg:w-96"
                      {...addNoteRegister('title', { required: true })}
                      maxLength={100}
                    />
                    <textarea
                      style={{
                        height: 25,
                      }}
                      onKeyDown={(e) => {
                        e.target.style.height = '25px';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      className="!outline-none xs:w-24 lg:w-96"
                      placeholder="Add Description"
                      {...addNoteRegister('description', { required: true })}
                    ></textarea>
                    <button
                      type="submit"
                      disabled={addNoteSubmitting}
                      className={`relative left-[9%] hover:text-gray-100 inline-flex items-center px-4 py-2 text-sm font-semibold leading-6 text-blue-400 transition duration-150 ease-in-out border-2 border-blue-400 hover:bg-blue-400 rounded-md shadow ${
                        addNoteSubmitting ? 'cursor-not-allowed' : ''
                      }`}
                    >
                      {addNoteSubmitting ? <Loader /> : <FontAwesomeIcon icon={faPlusCircle} className="text-xl transition-colors duration-300" />}
                    </button>
                  </form>
                </div>
              </li>
            </ul>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <NoteModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalNote={modalNote}
        setModalNote={setModalNote}
        saveNote={saveNote}
        hoveredModalCloseIcon={hoveredModalCloseIcon}
        setHoveredModalCloseIcon={setHoveredModalCloseIcon}
        updateNoteRegister={updateNoteRegister}
        updateNoteSubmit={updateNoteSubmit}
        setValue={setValue}
        isSubmitting={updateNoteSubmitting}
      />
    </>
  );
});

export default TaskList;
