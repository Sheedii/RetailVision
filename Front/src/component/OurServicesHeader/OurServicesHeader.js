import React from 'react';
import PropTypes from 'prop-types';
import './ourservicesheader.css';

const OurServicesHeader = ({ title }) => {
  return (
    <div className='OurService'>
        <div className='title'>
            {title}
        </div>
    </div>
  );
};

OurServicesHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default OurServicesHeader;