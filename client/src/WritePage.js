import React, { useState } from 'react';
import { Typography, Button } from '@mui/joy';
import Navbar from './Navbar';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WritePage = () => {
	const [md, setMd] = useState('');
	const [title, setTitle] = useState('');
	const [tags, setTags] = useState([]);
	const [photoUrl, setPhotoUrl] = useState('');
	const [submittedId, setSubmittedId] = useState('');

	const handleSubmit = () => {
		axios
			.post('http://localhost:8000/api/files/', {
				title: title,
				content: md,
				tags: tags,
				photoUrl: photoUrl,
			})
			.then((res) => setSubmittedId(res.data.id));
	};

	return (
		<div style={styles.main}>
			<Navbar />
			<Typography level='h1'>Write Page</Typography>
			{submittedId && (
				<Typography level='h4'>
					<Link to={`/view/${submittedId}`}>
						View your post by clicking here
					</Link>
				</Typography>
			)}

			<div style={styles.titleDiv}>
				{/* <Typography level='h4'>Title:</Typography> */}
				<input
					placeholder='Title'
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					style={styles.inputfield}
				></input>

				<input
					placeholder='Tags (comma separated)'
					onChange={(e) => {
						setTags(e.target.value.split(','));
					}}
					style={styles.inputfield}
				></input>

				<input
					placeholder='URL for title photo'
					onChange={(e) => {
						setPhotoUrl(e.target.value.split(','));
					}}
					style={styles.inputfield}
				></input>
			</div>
			<MDEditor
				value={md}
				onChange={setMd}
				style={styles.editorDisplay}
			/>

			<Button onClick={handleSubmit}>Submit</Button>
		</div>
	);
};

export default WritePage;

const styles = {
	main: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		boxSizing: 'border-box',
		padding: '0 5em',
	},

	editorDisplay: {
		width: '100%',
		minHeight: '100%',
		marginTop: '3rem',
	},

	editor: {
		// display: 'flex',
		whiteSpace: 'pre-wrap',
	},

	titleDiv: {
		display: 'flex',
		width: '100%',
		margin: '3em 0',
		flexDirection: 'column',
	},

	inputfield: {
		maxWidth: '300px',
		margin: '1rem 0',
	},
};
