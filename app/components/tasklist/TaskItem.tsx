import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleCheck, faCircleXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faRegularCircle, faCircleXmark as faRegularCircleXmark, faEye as faRegularEye } from '@fortawesome/free-regular-svg-icons';

interface TaskItemProps {
  note: any;
  hoveredItemsRadio: any;
  hoveredItemsDelete: any;
  hoveredItemsView: any;
  handleMouseEnterRadio: (itemId: number) => void;
  handleMouseLeaveRadio: (itemId: number) => void;
  handleMouseEnterDelete: (itemId: number) => void;
  handleMouseLeaveDelete: (itemId: number) => void;
  handleMouseEnterView: (itemId: number) => void;
  handleMouseLeaveView: (itemId: number) => void;
  openModal: (note: any) => void;
  removeNote: (id: number) => void;
  setStatus: (note: any, status: string) => void;
}

const TaskItem = ({
  note,
  hoveredItemsRadio,
  hoveredItemsDelete,
  hoveredItemsView,
  handleMouseEnterRadio,
  handleMouseLeaveRadio,
  handleMouseEnterDelete,
  handleMouseLeaveDelete,
  handleMouseEnterView,
  handleMouseLeaveView,
  openModal,
  removeNote,
  setStatus,
}: TaskItemProps) => {
  return (
    <li className="flex items-center justify-between py-2 px-4 bg-white hover:z-[1] hover:shadow-[0_3px_6px_1px_#00000026] hover:rounded-[5px]" key={note?.id}>
      <div className="flex items-center">
        <button type="button" className="btn px-0 border-none">
          {note?.status === 'in-progress' ? (
            <FontAwesomeIcon
              icon={hoveredItemsRadio[note?.id] ? faCircle : faRegularCircle}
              onClick={() => {
                setStatus(note, 'completed');
              }}
              onMouseEnter={() => handleMouseEnterRadio(note?.id)}
              onMouseLeave={() => handleMouseLeaveRadio(note?.id)}
              className="text-gray-300 text-xl transition-colors duration-300 hover:text-gray-500"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleCheck}
              onClick={() => {
                setStatus(note, 'in-progress');
              }}
              className="text-gray-300 text-xl transition-colors duration-300 hover:text-gray-500"
            />
          )}
        </button>
        <label className={`form-check-label ms-2 ${note?.status === 'completed' ? 'line-through' : ''}`}>
          {note?.title}
        </label>
      </div>
      <div className="flex">
        <button className="btn border-none">
          <FontAwesomeIcon
            icon={hoveredItemsView[note?.id] ? faEye : faRegularEye}
            className="text-xl text-green-500 transition-colors duration-300 hover:text-green-500"
            onMouseEnter={() => handleMouseEnterView(note?.id)}
            onMouseLeave={() => handleMouseLeaveView(note?.id)}
            onClick={() => openModal(note)}
          />
        </button>
        <button className="btn border-none">
          <FontAwesomeIcon
            icon={hoveredItemsDelete[note?.id] ? faCircleXmark : faRegularCircleXmark}
            className="text-xl text-red-500 transition-colors duration-300 hover:text-red-500"
            onMouseEnter={() => handleMouseEnterDelete(note?.id)}
            onMouseLeave={() => handleMouseLeaveDelete(note?.id)}
            onClick={() => removeNote(note?.id)}
          />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
