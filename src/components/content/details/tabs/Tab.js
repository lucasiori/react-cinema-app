import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Tab = ({ activeTab, label, onClick }) => {
  const [className, setClassName] = useState('tab-list-item');

  const onTabClick = () => {
    onClick(label);
  };

  useEffect(() => {
    if (activeTab === label) {
      setClassName((prevState) => prevState.concat(' tab-list-active'));
    } else {
      setClassName('tab-list-item');
    }
  }, [activeTab, label]);

  return (
    <>
      <li className={className} onClick={onTabClick}>
        {label}
      </li>
    </>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tab;
