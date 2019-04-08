import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({property}) => {
    const {index, picture} = property;
    return (
        <div id={`card-${index}`} className="card">
            <img src={picture} />
            <div className="details">
                <span className="index">{index+1}</span>
            </div>
        </div>
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired
}

export default Card;