import React, { Component } from 'react'
import {Input } from 'semantic-ui-react'
export default ({input, label, meta: { error, touched } }) => {
    return(
      <div>
        <label>{label}</label>
        <Input {...input} fluid/>
          <div className="text-warning" style={{ marginBottom: '20px' }}>
          {touched && error}
        </div>
      </div>
    );
};
