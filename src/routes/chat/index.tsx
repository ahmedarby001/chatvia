import React from 'react';
import './style.scss';
import Sidebar from '../../components/side_bar';


class ChatPage extends React.Component {
   render() {
      return(
         <div className="chat-container">
            <Sidebar />
         </div>
      );
   }
}

export default ChatPage;
