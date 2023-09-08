import React from "react";

function Overlay(props) {
    return (
        <div className="overlay">
            <h1>Quizzical</h1>
            <p>Quiz on the go!</p>
            <button onClick={props.setFirstLoaded}>Start Quiz</button>
        </div>
    )
}

export default Overlay;