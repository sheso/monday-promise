import { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import "./ContractForm.css";

import {database} from "../../../Auth/Fire";

// const LEFT = 'left';
// const RIGHT = 'right';

const ContractForm = () => {
  // const [buttonActive, setButtonActive] = useState('right');
	const { currentUser } = useContext(AuthContext);
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

	const contractsRef = database.contracts;

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
		contractsRef.add({
			deadline,
			description,
			difficulty,
			startdate,
			title,
			why,
			author: database.users.doc(currentUser.uid),
			done: false,
			createdAt: database.getCreatedAt(),
		}).then(() => {
			setInputs(initInputs);
			history.push('/');
		})
		.catch(err => setError(err));
  };

  return (
    <div className="contract-form-container">
      <h2>Новое обещание</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="contract-title">Цель:</label>
          <input
            type="text"
            name="title"
            id="contract-title"
            onChange={handleInput}
            value={inputs.title}
          />
        </div>
        <div className="form-item">
          <label htmlFor="contract-description">Описание:</label>
          <textarea
            type="text"
            name="description"
            id="contract-description"
            onChange={handleInput}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="form-item">
          <label htmlFor="contract-deadline">Срок:</label>
          <input
            type="date"
            name="deadline"
            id="contract-deadline"
            onChange={handleInput}
            value={inputs.deadline}
          />
        </div>
        <div className="form-item">
          <label htmlFor="contract-startdate">Начало:</label>
          <input
            type="date"
            name="startdate"
            id="contract-startdate"
            onChange={handleInput}
            value={inputs.startdate}
          />
        </div>

        <div className="form-item">
          <label htmlFor="contract-why">Зачем?</label>
          <input
            type="text"
            name="why"
            id="contract-why"
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
								<label htmlFor="contract-why">Зачем?</label>
								<input type="text" id="contract-why" />
							</p>
							<p>
								<label htmlFor="contract-why">Зачем?</label>
								<input type="text" id="contract-why" />
							</p>
							<p>
								<label htmlFor="contract-why">Зачем?</label>
								<input type="text" id="contract-why" />
							</p>
						</>
					)
				} */}
        <div className="form-item">
          <label htmlFor="contract-difficulty">Сложность:</label>
          <input
            type="range"
            id="contract-difficulty"
            name="difficulty"
            min="1"
            max="10"
            onChange={handleInput}
            value={inputs.difficulty}
          />
          <button disabled={buttonDisabled} type="submit" className="contract-form-button">
            Даю обещание!
          </button>
        </div>
      </form>
			{err ? <p>{err}</p> : null}
    </div>
  );
};

export default ContractForm;
