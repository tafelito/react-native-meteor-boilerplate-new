import React, { Component } from 'react';
import Chats from './Chats';

// In case we need the container to be an ES6 class, we could use like this
// It's not neccesary in this case (and actually, it should be a stateless function),
// but just for the sake of the example
export default class ChatsContainer extends Component {
  render() {
    return (
      <Chats />
    );
  }
}
