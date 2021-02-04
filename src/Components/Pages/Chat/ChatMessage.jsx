//uid photoUrl - данные о юзере

const ChatMessage = ({ text, uid, photoUrl }) => {
  
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
  
  return( 
    <>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://i.pinimg.com/originals/57/7c/eb/577ceb09b2de9557a93ccb625a38c678.jpg'} />
      <p>{text}</p>
    </div>
  </>
  )
}
export default ChatMessage
