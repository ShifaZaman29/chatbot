import ProfileRobotPhoto from '../assets/robot.png';
import ProfileUserPhoto from '../assets/user.png';
import './ChatMessage.css';
import dayjs from 'dayjs';

export function ChatMessage({ message, sender, time }) {
        // const message = props.message;
        // const sender = props.sender;
        // const { message, sender } = props;
     
        return (
          <div className={
            sender === 'user'
              ? 'chat-message-user'
              : 'chat-message-robot'
          }>
            {sender === 'robot' && (
              <img src= {ProfileRobotPhoto} className="chat-message-profile" />
            )}
            <div className="chat-message-text">
              {message}
              {/* The "time && (" check is optional. I added it just to be safe. */}
              {time && (
                <div className='chat-message-time'>
                  {dayjs(time).format('h:mma')}
                </div>
              )}
            </div>
            {sender === 'user' && (
              <img src={ProfileUserPhoto} className="chat-message-profile" />
            )}
          </div>
        );
      }