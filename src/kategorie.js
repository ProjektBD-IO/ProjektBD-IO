import React, { useState } from 'react';

function DropdownMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="dropdown-menu" onMouseEnter={toggleOpen} onMouseLeave={closeMenu}>
      <button className="dropdown-button">
        {props.label}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {props.children}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;