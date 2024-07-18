import React from 'react'

function DefaultLayout(props) {
  return (
    <div>
        <div className="header">

            <div className="d-flex justify-content-between">

                <h1>AUTOECO</h1>

            </div>

        </div>
        <div className="content">

            {props.children}

        </div>
    </div>
  )
}

export default DefaultLayout