import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../common/Message'

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className='ui active dimmer'>
      <div onClick={e => e.stopPropagation()} className='ui active modal'>
        <div className='header'>{props.title}</div>
        {props.error && (
            <div>
              <Message title='Ops!' message={props.error.data} type='negative'/>
            </div>
        )}
        <div className='content'>{props.content}</div>
        <div className='actions'>{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;