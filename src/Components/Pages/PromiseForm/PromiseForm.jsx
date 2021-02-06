import { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./PromiseForm.css";

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const auth = firebase.auth()
const firestore = firebase.firestore()

// const LEFT = 'left';
// const RIGHT = 'right';

const PromiseForm = () => {
  // const [buttonActive, setButtonActive] = useState('right');
	const history = useHistory();
	const initInputs = {
    deadline: Date.now(),
    description: "",
    difficulty: 5,
    startdate: Date.now(),
    title: "",
    why: "",
  }

  const [inputs, setInputs] = useState(initInputs);
	const [err, setError] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const promisesRef = firestore.collection("promise");

  // const handleButtonClick = (side) => {
  // 	if (side === LEFT && buttonActive === RIGHT) {
  // 		setButtonActive(LEFT);
  // 	} else if (side === RIGHT && buttonActive === LEFT) {
  // 		setButtonActive(RIGHT);
  // 	}
  // }

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
		setButtonDisabled(true);
    console.log(inputs);
		const { deadline, description, difficulty, startdate, title, why } = inputs;
		promisesRef.add({
			deadline,
			description,
			difficulty,
			startdate,
			title,
			why,
			author: auth.currentUser.uid,
		}).then(() => {
			setInputs(initInputs);
			history.push('/');
		})
		.catch(err => setError(err));
  };

  return (
    <div className="promise-form-container">
      <h2>Новое обещание</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="promise-title">Цель:</label>
          <input
            type="text"
            name="title"
            id="promise-title"
            onChange={handleInput}
            value={inputs.title}
          />
        </div>
        <div className="form-item">
          <label htmlFor="promise-description">Описание:</label>
          <textarea
            type="text"
            name="description"
            id="promise-description"
            onChange={handleInput}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="form-item">
          <label htmlFor="promise-deadline">Срок:</label>
          <input
            type="date"
            name="deadline"
            id="promise-deadline"
            onChange={handleInput}
            value={inputs.deadline}
          />
        </div>
        <div className="form-item">
          <label htmlFor="promise-startdate">Начало:</label>
          <input
            type="date"
            name="startdate"
            id="promise-startdate"
            onChange={handleInput}
            value={inputs.startdate}
          />
        </div>

        <div className="form-item">
          <label htmlFor="promise-why">Зачем?</label>
          <input
            type="text"
            name="why"
            id="promise-why"
            onChange={handleInput}
            value={inputs.why}
          />
        </div>

        {/* <p>
					<span>Шаги: </span>
					<div>
						<span>
							<button className={buttonActive === LEFT ? 'active-button' : ''} onClick={() => handleButtonClick(LEFT)}>
								Единоразовые
							</button>
						</span>
						<span>
							<button className={buttonActive === RIGHT ? 'active-button' : ''} onClick={() => handleButtonClick(RIGHT)}>
								Регулярные
							</button>
						</span>
					</div>
				</p>
				{
					// TODO: add logic to adding extra inputs for steps and regular tasks parameters
					buttonActive === LEFT && (
						<>
							<p>
								<label htmlFor="promise-why">Зачем?</label>
								<input type="text" id="promise-why" />
							</p>
							<p>
								<label htmlFor="promise-why">Зачем?</label>
								<input type="text" id="promise-why" />
							</p>
							<p>
								<label htmlFor="promise-why">Зачем?</label>
								<input type="text" id="promise-why" />
							</p>
						</>
					)
				} */}
        <div className="form-item">
          <label htmlFor="promise-difficulty">Сложность:</label>
          <input
            type="range"
            id="promise-difficulty"
            name="difficulty"
            min="1"
            max="10"
            onChange={handleInput}
            value={inputs.difficulty}
          />
          <button disabled={buttonDisabled} type="submit" className="promise-form-button">
            Даю обещание!
          </button>
        </div>
      </form>
			{err ? <p>{err}</p> : null}
    </div>
  );
};

export default PromiseForm;
