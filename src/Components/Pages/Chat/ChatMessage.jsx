import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import './Chat.css'

const ChatMessage = ({ text, uid, photoURL, displayName, createdAt }) => {
  const createdData = createdAt?.toDate() ? new Date(createdAt?.toDate()) : new Date()
  const messageData = createdData.toLocaleDateString('ru-RU')

  const { currentUser } = useContext(AuthContext)

  const messageClass = uid === currentUser.uid ? 'sent' : 'received'

  return (
    <div className="mesDes my-2">
      <div className={`message-${messageClass} my-3 mx-3`}>
        <img
          src={
            photoURL ||
            'http://planetasharov.ru/upload/shop_1/1/3/4/item_1348/shop_items_catalog_image1348.jpg'
          }
          width="50px"
          height="50px"
          alt="userpic"
          style={{ borderRadius: '10px' }}
        />
        <p style={{ color: '#426696', fontWeight: '600' }}>
          {displayName} {messageData}
        </p>
        <p className="textMes">{text}</p>
      </div>
    </div>
  )
}
export default ChatMessage
