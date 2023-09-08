import React from 'react';

function Question(props) {
	function handleClick(event) {
		props.changeSelected(props.id, event.target.innerText);
	}

	function matchCorrect(buttonText) {
		var classString = 'option';
		if (props.gameOver) {
			classString = ' option optionGameOver';
			classString =
				classString +
				`${props.selectedOption === buttonText ? ' incorrect' : ''}${
					props.correctOption === buttonText ? ' correct' : ''
				}`;
		} else {
			classString =
				classString +
				`${props.selectedOption === buttonText ? ' selected' : ''}`;
		}
		return classString;
	}

	return (
		<div className="question">
			<h1>{props.question}</h1>
			<div className="options">
				{props.options.map((option) => {
					return (
						<button
							className={matchCorrect(option)}
							disabled={props.gameOver}
							onClick={handleClick}
						>
							{option}
						</button>
					);
				})}
			</div>
			<div className="line"></div>
		</div>
	);
}

export default Question;
