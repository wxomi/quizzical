import React, { useState, useEffect } from 'react';
import data from '../defaultData';
import Question from './Question';
import { nanoid } from 'nanoid';
import { shuffle } from '../helperFunctions';

function Questions() {
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestion] = useState(data);
	const [gameOver, setGameOver] = useState(false);
	const [playCount, setPlayCount] = useState(1);

	useEffect(() => {
		console.log('rendred');
		function decodeHTMLEntities(text) {
			let textArea = document.createElement('textarea');
			textArea.innerHTML = text;
			return textArea.value;
		}
		function preProcess(data) {
			var processedArray = data.results.map((item) => {
				return {
					id: nanoid(),
					question: decodeHTMLEntities(item.question),
					options: shuffle([
						decodeHTMLEntities(item.correct_answer),
						decodeHTMLEntities(item.incorrect_answers[0]),
						decodeHTMLEntities(item.incorrect_answers[1]),
						decodeHTMLEntities(item.incorrect_answers[2]),
					]),
					correctOption: decodeHTMLEntities(item.correct_answer),
					selectedOption: null,
				};
			});
			setQuestion(processedArray);
			setIsLoading(false);
		}
		setIsLoading(true);
		setGameOver(false);
		fetch(
			'https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple'
		)
			.then((res) => res.json())
			.then((data) => preProcess(data));
	}, [playCount]);

	function checkSubmission() {
		setGameOver(true);
	}

	function playAgain() {
		setPlayCount((prev) => {
			return prev + 1;
		});
	}

	function changeSelected(id, optionString) {
		setQuestion((currentState) => {
			return currentState.map((item) => {
				var newObj =
					item.id === id
						? item.selectedOption === optionString
							? { ...item, selectedOption: null }
							: { ...item, selectedOption: optionString }
						: item;
				return newObj;
			});
		});
	}

	var elementArray = questions.map((item) => {
		return (
			<Question
				key={item.id}
				{...item}
				changeSelected={changeSelected}
				gameOver={gameOver}
			/>
		);
	});

	function updateFooter() {
		var correctArray = questions.filter((item) => {
			return item.selectedOption === item.correctOption;
		});
		return (
			<>
				<p className="footerText">
					You Scored {correctArray.length}/5 correct answers
				</p>
				<button className="submit" onClick={playAgain}>
					Play Again
				</button>
			</>
		);
	}

	// var elementArray = questions.map((item) => {
	//     var optionsArray = [item.correct_answer, ...item.incorrect_answers];
	//     optionsArray = shuffle(optionsArray);
	//     console.log(optionsArray)
	//     return (
	//         <Question
	//             key={nanoid()}
	//             item = {item}
	//             optionsArray = {optionsArray}
	//         />
	//     )
	// })

	return (
		<div className="questions">
			{isLoading ? (
				<div className="loaderCon">
					<div className="loader">
						<div className="spinner"></div>
					</div>
				</div>
			) : (
				<>
					<p>Quiz Number: {playCount}</p>
					{elementArray}
					<div className="footer">
						{gameOver ? (
							updateFooter()
						) : (
							<button
								className="submit"
								onClick={checkSubmission}
							>
								Check Answers
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Questions;
