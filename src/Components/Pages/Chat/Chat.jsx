import { useRef, useState, useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext';
import { database } from '../../../Auth/Fire';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'

const Chat = () => {
	const { currentUser } = useContext(AuthContext);
  const scroll = useRef()
  const messagesRef = database.messages //нужно создать коллекцию
  const query = messagesRef.orderBy('createdAt').limit(25) //сортировка по параметру(дате создания) - лимит это ограничение по кол-во файлов

  const [messages] = useCollectionData(query, { idField: 'id' }) //запрос по айдишникам к самой базе данных??

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (event) => {
    event.preventDefault()
    // const { } =  здесь мы забираем данные юзера (фото, айди(имя - так как шифр) ) const { uid, photoURL } = currentUser;
    const { uid, photoURL } = currentUser
    await messagesRef.add({
      text: formValue,
      createdAt: database.getCreatedAt(),
      uid,
      photoURL,
    })
    setFormValue('')
    scroll.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <main>
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        <span ref={scroll} />
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(event) => setFormValue(event.target.value)}
          placeholder="Введите сообщение"
        />
        <button type="submit" disabled={!formValue}>
          Отправить
        </button>
      </form>
    </>
  )
}

export default Chat
