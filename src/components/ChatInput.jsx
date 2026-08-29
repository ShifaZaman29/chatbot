import dayjs from 'dayjs';
import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');
        function saveInputText(event) {
          setInputText(event.target.value);
        }

        
        async function sendMessage() {
          // Clear the textbox at the top now because the Chatbot
          // will take some time to load the response. We want
          // to clear the textbox immediately rather waiting
          // for the Chatbot to finish loading.
          setInputText('');

          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ];

          
          setChatMessages([
            ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be removed later, when we add the response.
            {
              message: <img src={LoadingImage} className="loading-spinner" />,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);

          
          const response = await Chatbot.getResponseAsync(inputText);
          setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID(),
              time: dayjs().valueOf()
            }
          ]);

        
        }

        function handleKeyDown(event) {  
          if (event.key === 'Enter') {  
            sendMessage();  
          } else if (event.key === 'Escape') {  
            setInputText('');  
          }  
        } 

        function clearMessages() {
          setChatMessages([]);

          // Here, you could also run:
          // localStorage.setItem('messages', JSON.stringify([]));

          // However, because chatMessages is being updated, the
          // useEffect in the App component will run, and it will
          // automatically update messages in localStorage to be [].
        }


        return (
          <div className="chat-input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              value={inputText}
              onKeyDown = {handleKeyDown}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              className="send-button"
            >Send</button>

            <button
              onClick={clearMessages}
              className="clear-button"
            >Clear</button>
          </div>
        );
      }