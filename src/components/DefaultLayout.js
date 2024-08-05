import React from 'react';

function DefaultLayout(props) {
  const headerStyle = {
    padding: '10px 20px',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle = {
    margin: 0,
    color: 'white',
  };

  return (
    <div>
      <div className="header" style={headerStyle}>
        <h1 style={titleStyle}>AUTOECO</h1>
        <button type="button" className="btn btn-primary btn-sm">Inscription </button>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
