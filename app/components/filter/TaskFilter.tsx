import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './TaskFilter.module.css';
import { useState, useEffect, useRef } from 'react';
import store from '../../mobx/store';

export default function TaskFilter() {
  const [open, setOpen] = useState(false);
  const { fetchNotes } = store;
  const [selectedCategory, setSelectedCategory] = useState('in-progress');
  const onCategorySelected = (category) => {
    setSelectedCategory(category);
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
      <button className={`py-1.5 pr-[0.75rem] pl-[0.75rem] ${styles.btn_light}`} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faEllipsis} className="fs-4"/>
      </button>
      {open && (
        <ul className={ `${styles.dropdown_menu}`}>
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
