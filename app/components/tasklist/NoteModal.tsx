import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark as faRegularCircleXmark, faEye as faRegularEye } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faCircleCheck, faCircleXmark, faPencil, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Loader from '../utilities/Loader';

// Modal Styles
const customStyles = {
    content: {
      inset: '50px',
      border: 'none',
      borderRadius: '0',
      padding: '0',
      width: 'auto',
      maxWidth: '90vh',
      height: 'max-content',
      margin: '0 auto',
      overflow: 'auto',
      background: '#fff',
      boxShadow: '0 2px 10px 1px rgba(0, 0, 0, 0.15)',
    },
  };

interface NoteModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  modalNote: any;
  saveNote: (note: any) => void;
  hoveredModalCloseIcon: boolean;
  setHoveredModalCloseIcon: (value: boolean) => void;
  updateNoteRegister: any;
  updateNoteSubmit: any;
  setValue: any;
  isSubmitting: boolean;
}

const NoteModal = ({
  modalIsOpen,
  closeModal,
  modalNote,
  saveNote,
  hoveredModalCloseIcon,
  setHoveredModalCloseIcon,
  updateNoteRegister,
  updateNoteSubmit,
  setValue,
  isSubmitting,
}: NoteModalProps) => {
  
  useEffect(() => {
    if (modalNote) {
      setValue('id', modalNote.id);
      setValue('title', modalNote.title);
      setValue('status', modalNote.status);
      setValue('description', modalNote.description);
    }
  }, [modalNote, setValue]);

  const handleMouseEnterRadio = () => {
    setHoveredModalCloseIcon(true);
  };

  const handleMouseLeaveRadio = () => {
    setHoveredModalCloseIcon(false);
  };

  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="View Edit Note Modal">
      <div className="px-5 pt-0 flex flex-shrink-0 items-center justify-between border-top-left-radius-md border-top-right-radius-md">
        <h4 className="mb-0 lh-150">View / Edit Note</h4>
        <button type="button" className="btn border-none" aria-label="Close" onClick={closeModal}>
          <FontAwesomeIcon
            icon={hoveredModalCloseIcon ? faCircleXmark : faRegularCircleXmark}
            className="fa-regular text-xl text-gray-900"
            onMouseEnter={handleMouseEnterRadio}
            onMouseLeave={handleMouseLeaveRadio}
          />
        </button>
      </div>
      <div className="px-16 pt-15 relative flex-1 flex-grow-1 mt-4">
        <form onSubmit={updateNoteSubmit(saveNote)}>
          <div className="flex flex-col items-center">
            <input type="hidden" {...updateNoteRegister('id', { required: true })} />
            <input
              type="text"
              maxLength={100}
              className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
              id="title"
              placeholder="Edit Title"
              {...updateNoteRegister('title')}
            />
            <textarea
              className="!outline-none mb-4 block w-full text-sm font-medium text-gray-700 border-bottom-1"
              id="description"
              placeholder="Edit Description"
              {...updateNoteRegister('description')}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mb-3 inline-flex items-center p-2 text-sm font-semibold leading-6 text-green-400 transition duration-150 ease-in-out border-2 border-green-400 rounded-md shadow ${isSubmitting ? 'cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? <><Loader /> <span>Saving</span></> : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NoteModal;
