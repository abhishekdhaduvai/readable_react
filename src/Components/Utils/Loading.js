import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => (
  <div className="loading">
    <CircularProgress size={60} thickness={7} color='orange'/>
  </div>
);

export default Loading;