import { useRef, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage'


const auth = firebase.auth()
const firestore = firebase.firestore()

const Chat = () => {
  const scroll = useRef()
  const messagesRef = firestore.collection('messages') //нужно создать коллекцию
  const query = messagesRef.orderBy('createdAt').limit(25) //сортировка по параметру(дате создания) - лимит это ограничение по кол-во файлов

  const [messages] = useCollectionData(query, { idField: 'id' }) //запрос по айдишникам к самой базе данных??

  const [formValue, setFormValue] = useState('')

  const sendMessage = async (event) => {
    event.preventDefault()
    // const { } =  здесь мы забираем данные юзера (фото, айди(имя - так как шифр) ) const { uid, photoURL } = auth.currentUser;
    const { uid, photoURL, displayName } = auth.currentUser
    console.log(auth.currentUser)
    await messagesRef.add({
      displayName,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
