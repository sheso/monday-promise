import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import "./ContractForm.css";
import { CONTRACT_ACTIVE } from '../../../databaseHandlers';

import { database } from "../../../Auth/Fire";

const ContractForm = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const initInputs = {
    deadline: Date.now(),
    description: "",
    difficulty: 5,
    title: "",
    why: "",
  };

  const [inputs, setInputs] = useState(initInputs);
  const [err, setError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const contractsRef = database.contracts;

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const now = new Date();
  const minDate = now.toISOString().substring(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();
		setButtonDisabled(true);
		const { deadline, description, difficulty, title, why } = inputs;
    
		contractsRef.add({
			deadline: database.Timestamp.fromDate(new Date(deadline)),
			description,
			difficulty,
			title,
			why,
			author: database.users.doc(currentUser.uid),
			status: CONTRACT_ACTIVE,
			createdAt: database.getCreatedAt(),
		}).then(() => {
			setInputs(initInputs);
			history.push('/feed');
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
						required
            type="text"
            name="title"
            id="contract-title"
            onChange={handleInput}
            value={inputs.title}
            placeholder="Что вы хотите пообещать ?"
          />
        </div>

        <div className="form-item">
          <label htmlFor="contract-description">Описание:</label>
          <textarea
						required
            type="text"
            name="description"
            id="contract-description"
            onChange={handleInput}
            value={inputs.description}
            placeholder="Опишите, свою цель"
          ></textarea>
        </div>

        <div className="form-item">
          <label htmlFor="contract-deadline">Срок:</label>
          <input
						required
            type="date"
            min={minDate}
            name="deadline"
            id="contract-deadline"
            onChange={handleInput}
            value={inputs.deadline}
          />
        </div>

        <div className="form-item">
          <label htmlFor="contract-why">Зачем?</label>
          <input
						required
            type="text"
            name="why"
            id="contract-why"
            onChange={handleInput}
            value={inputs.why}
            placeholder='Почему вы хотите выполнить это обещание?'
          />
        </div>

        <div className="form-item">
          <label htmlFor="contract-difficulty">Сложность:</label>
          <input
						required
            type="range"
            id="contract-difficulty"
            name="difficulty"
            min="1"
            max="10"
            onChange={handleInput}
            value={inputs.difficulty}
          />
          <button
            disabled={buttonDisabled}
            type="submit"
            className="contract-form-button"
          >
            Даю обещание!
          </button>
        </div>
      </form>
      {err ? <p>{err}</p> : null}
    </div>
  );
};

export default ContractForm;
