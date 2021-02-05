import { useState } from 'react';

// const LEFT = 'left';
// const RIGHT = 'right';

const PromiseForm = () => {
	// const [buttonActive, setButtonActive] = useState('right');
	const [inputs, setInputs] = useState({
		deadline: Date.now(),
		description: '',
		difficulty: 5,
		startdate: Date.now(),
		title: '',
		why: '',
	});

	// const handleButtonClick = (side) => {
	// 	if (side === LEFT && buttonActive === RIGHT) {
	// 		setButtonActive(LEFT);
	// 	} else if (side === RIGHT && buttonActive === LEFT) {
	// 		setButtonActive(RIGHT);
	// 	}
	// }

	const handleInput = e => {
		setInputs({...inputs, [e.target.name]: e.target.value});
	}

	const handleSubmit = e => {
		e.preventDefault();
		console.log(inputs);
	}

	return (
		<div className="promise-form-container">
			<h2>Новое обещание</h2>
			<form onSubmit={handleSubmit}>
				<p>
					<label htmlFor="promise-title">Цель:</label>
					<input type="text" name="title" id="promise-title" onChange={handleInput} value={inputs.title} />
				</p>
				<p>
					<label htmlFor="promise-description">Описание:</label>
					<textarea type="text" name="description" id="promise-description" onChange={handleInput} value={inputs.description} ></textarea>
				</p>
				<p>
					<label htmlFor="promise-deadline">Срок:</label>
					<input type="date" name="deadline" id="promise-deadline" onChange={handleInput} value={inputs.deadline} />
				</p>
				<p>
					<label htmlFor="promise-startdate">Начало:</label>
					<input type="date" name="startdate" id="promise-startdate" onChange={handleInput} value={inputs.startdate} />
				</p>
				<p>
					<label htmlFor="promise-why">Зачем?</label>
					<input type="text" name="why" id="promise-why" onChange={handleInput} value={inputs.why} />
				</p>
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
				<p>
					<label htmlFor="promise-difficulty">Сложность:</label>
  				<input type="range" id="promise-difficulty" name="difficulty" min="1" max="10" onChange={handleInput} value={inputs.difficulty} />	
				</p>
				<button type="submit">Даю обещание!</button>
			</form>
		</div>
	)
}

export default PromiseForm;
