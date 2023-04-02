import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import FilePage from './FilePage';
import HomePage from './HomePage';
import WritePage from './WritePage';

const add10 = () => {
	for (let i = 0; i < 10; i++) {
		axios({
			method: 'post',
			url: 'http://localhost:8000/api/files',
			data: {
				content: 'a lot of content is here',
				title: 'unique title goes here',
			},
		});
	}
};

function App() {
	useEffect(() => {
		// console.log(focusFile);
	});
	return (
		<Routes>
			<Route path='/' element={<HomePage />} style={styles.homepage} />
			<Route path='/view/:id' element={<FilePage />} />
			<Route path='/view' element={<HomePage />} />
			<Route path='/write' element={<WritePage />} />
		</Routes>
	);
}

const styles = {
	homepage: {
		display: 'flex',
		justifyContent: 'center',
	},
};

export default App;
