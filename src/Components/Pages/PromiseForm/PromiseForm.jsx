import { useState } from 'react';

const LEFT = 'left';
const RIGHT = 'right';

const PromiseForm = () => {
	const [buttonActive, setButtonActive] = useState('right');

	const handleButtonClick = (side) => {
		if (side === LEFT && buttonActive === RIGHT) {
			setButtonActive(LEFT);
		} else if (side === RIGHT && buttonActive === LEFT) {
			setButtonActive(RIGHT);
		}
	}

	return (
		<div className="promise-form-container">
			<h2>Новое обещание</h2>
			<form>
				<p>
					<label for="promise-title">Цель:</label>
					<input type="text" id="promise-title"/>
				</p>
				<p>
					<label for="promise-description">Описание:</label>
					<textarea type="text" id="promise-description"></textarea>
				</p>
				<p>
					<label for="promise-deadline">Срок:</label>
					<input type="date" id="promise-deadline" />
				</p>
				<p>
					<label for="promise-why">Зачем?</label>
					<input type="text" id="promise-why" />
				</p>
				<p>
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
								<label for="promise-why">Зачем?</label>
								<input type="text" id="promise-why" />
							</p>
							<p>
								<label for="promise-why">Зачем?</label>
								<input type="text" id="promise-why" />
							</p>
							<p>
								<label for="promise-why">Зачем?</label>
								<input type="text" id="promise-why" />
							</p>
						</>
					)
				}

			</form>
			
		</div>
	)
}

export default PromiseForm;
