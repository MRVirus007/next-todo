import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect, useRef } from 'react';
import store from '../../mobx/store';

export default function TaskFilter() {
  const [open, setOpen] = useState(false);
  const { fetchNotes } = store;
  const [selectedCategory, setSelectedCategory] = useState('in-progress');
  const onCategorySelected = (category) => {
    setSelectedCategory(category);
    setOpen(!open);
    fetchNotes(category);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Event listener callback to close the dropdown when a click occurs outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    //remove the event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="float-right relative" ref={dropdownRef}>
      <button
        className="relative border-none text-gray-300 ml-[4.6em] py-1.5 pr-[0.75rem] pl-[0.75rem] border-transparent z-10 rounded-t disabled:shadow-[0_0_6px_1px_rgba(0,0,0,0.15)] disabled:text-gray-900 hover:text-gray-900 after:bg-white after:content-[''] after:absolute after:bottom-[-5px] after:right-0 after:w-[99%] after:h-[15px] after:z-[4]"
        disabled={open}
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={faEllipsis} className="fs-4"/>
      </button>
      {open && (
        <ul className="min-w-min absolute block p-0 bg-white shadow-[0_2px_10px_1px_rgba(0,0,0,0.15)] rounded border-none z-[3]">
          <li className='border-bottom-1 py-2.5 px-5'>
            <a
              className={`${selectedCategory === 'completed' ? 'text-blue-500' : 'text-gray-300 hover:text-gray-900'} text-base`}
              href="#"
              onClick={() => onCategorySelected('completed')}
            >
              Completed
            </a>
          </li>
          <li className='py-2.5 px-5'>
            <a
              className={`${selectedCategory === 'in-progress' ? 'text-blue-500' : 'text-gray-300 hover:text-gray-900'} text-base`}
              href="#"
              onClick={() => onCategorySelected('in-progress')}
            >
              In Progress
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
