import isEmpty from 'lodash/fp/isEmpty';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesActions, messagesSelectors } from '../../store/messages';
import Message from './Message';

const dismissMessage = severity => messagesActions.removeMessage(severity);

const Notification = () => {
  const dispatch = useDispatch();
  const { message } = useSelector(({ messages }) => ({
    message: messagesSelectors.getNonMajorMessageSelector()({ messages })
  }));

  return (
    <>
      {!isEmpty(message) && (
        <Message
          title={message.title}
          severity={message.severity}
          removeHandler={() => dispatch(dismissMessage(message.severity))}
        >
          {message.content}
        </Message>
      )}
    </>
  );
};

export default Notification;
