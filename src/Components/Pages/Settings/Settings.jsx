import { useContext, useEffect } from 'react'
import { database } from '../../../Auth/Fire'
import { AuthContext } from '../../../Context/AuthContext'
import './Settings.css'
import firebase from "firebase";

const Settings = () => {

  const {currentUser, setCurrentUser} = useContext(AuthContext)

  console.log(currentUser.displayName, 'nnnnnn')

  useEffect(() => {
  const testFunct = async () => {
    const user = await database.users
    .where('name', '==', currentUser.displayName)
    .get()
    const newTest = (await user).docs.map(doc => doc.data())
    console.log(newTest, '<------')
    console.log(database.users.doc(currentUser.uid))

  }
  testFunct()
}, [])

  return (
    <main>
      <section className="glass">
        <h3>Изменить данные</h3>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Введите e-mail"
          // onChange={changeLoginHandler}
        />
        <button
          className="btn btn-primary"
        >
          Поменять имя
        </button>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Введите пароль"
          // onChange={changeLoginHandler}
        />
        <button
          className="btn btn-primary"
        >
          Поменять фото
        </button>
      </section>
      </main>
  )
}

export default Settings
