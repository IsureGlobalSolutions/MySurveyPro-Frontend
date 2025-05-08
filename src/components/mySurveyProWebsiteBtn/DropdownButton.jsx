import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.css';
import { FaCaretDown } from "react-icons/fa";

const DropdownButton = ({ items, onSelect, listKeyName ,selectionName,...props}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(` ${selectionName? selectionName:'Select an option'}`);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    setSelectedItem(item[listKeyName] ? item[listKeyName] : 'Select an option'); // Dynamically set the selected item's display name
    setIsOpen(false);            // Close the dropdown
    onSelect(item);              // Send the selected item back to the parent component
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className='custom-dropdown-container' type="button" {...props}>
      <div className='d-flex justify-content-between align-items-center select-survey gap-2 py-2' onClick={toggleDropdown}>
        <div className='textdropdown'>{selectedItem}</div>
        <div><FaCaretDown /></div>
      </div>
      {isOpen && (
        <div className='dropdowndummy'>
          {Array.isArray(items) ? (
            items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className='dropdown-item' onClick={() => handleSelect(item)}>
                  {item[listKeyName] ? item[listKeyName] : 'No Data'} {/* Dynamically display the property */}
                </div>
              ))
            ) : (
              <p>No Data</p>
            )
          ) : (
            <p>No List Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
