import React, { useState } from 'react';
import Overlay from './components/Overlay';
import Questions from './components/Ouestions';

function App() {
	const [firstLoaded, setFirstLoaded] = useState(true);

	return (
		<div className="app">
			<div className="blob yellow"></div>
			<div className="blob blue"></div>
			{firstLoaded ? (
				<Overlay
					setFirstLoaded={() => {
						setFirstLoaded(false);
					}}
				/>
			) : (
				<Questions />
			)}
		</div>
	);
}

export default App;
