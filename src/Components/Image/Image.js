import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './Image.css';
import { connect } from 'react-redux';

const Image = (props) => {
  const { imgName } = props.match.params;
  return (
    <div>
      <img className="currentImg" src={`img/${imgName}`} alt="Logo" />
    </div>
  );
};

export default withRouter(Image);
// Image.propTypes = {
//   currentImg: PropTypes.string.isRequired,
// };

// const mapStateToProps = state => ({
//   currentImg: state.images.currentImg,
// });

// export default connect(mapStateToProps)(Image);
