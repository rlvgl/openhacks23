import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardOverflow, AspectRatio } from '@mui/joy';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Hero from './Hero';
import { sampleMD } from './FilePage';

// helper function to populate db
const add10 = () => {
	for (let i = 0; i < 10; i++) {
		axios.post('https://phoenix-files-server.herokuapp.com/api/files', {
			title: 'Sample Markdown File',
			content: sampleMD,
			tags: ['ethereum', 'chatgpt', 'ai', 'ml', 'machine learning'],
			photoUrl:
				'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286',
		});
	}
};

const HomePage = () => {
	const [files, setFiles] = useState([]);
	const [search, setSearch] = useState('');
	const [searchActive, setSearchActive] = useState(false);

	const onSearch = () => {
		if (!search) {
			setSearchActive(false);
			axios
				.get('https://phoenix-files-server.herokuapp.com/api/files')
				.then((res) => {
					setFiles(res.data.rows);
				});
			return;
		}

		axios
			.get(
				`https://phoenix-files-server.herokuapp.com/api/files?tags=${search}`
			)
			.then((res) => setFiles(res.data.rows));
		setSearchActive(true);
	};

	useEffect(() => {
		axios
			.get('https://phoenix-files-server.herokuapp.com/api/files')
			.then((res) => {
				setFiles(res.data.rows);
			});
	}, []);

	return (
		<div style={styles.main}>
			<Navbar />
			<Hero />

			{searchActive && (
				<Typography level='h4' style={styles.searchactivetext}>
					Current search for tags by name: "{search}"
				</Typography>
			)}
			<div style={styles.searchbar}>
				<input
					placeholder='Search for tags by name'
					style={styles.searchSpacer}
					onChange={(e) => setSearch(e.target.value)}
				></input>
				<Button style={styles.searchbutton} onClick={() => onSearch()}>
					Search
				</Button>
			</div>

			<div style={styles.grid}>
				{files.map((f) => {
					return <FileCard key={f.id} file={f} />;
				})}
			</div>
		</div>
	);
};

const FileCard = ({ file }) => {
	return (
		<Link to={`view/${file.id}`}>
			<Card variant='outlined' sx={{ width: 320 }}>
				<CardOverflow>
					<AspectRatio ratio='2'>
						<img
							src={file.photourl}
							srcSet={file.photourl}
							loading='lazy'
							alt=''
						/>
					</AspectRatio>
				</CardOverflow>
				<Typography level='h2' sx={{ fontSize: 'md', mt: 2 }}>
					{file.title}
				</Typography>
				<Typography level='body2' sx={{ mt: 0.5, mb: 2 }}>
					{file.tags.join(', ')}
				</Typography>
			</Card>
		</Link>

		// 	<Link to={`view/${file.id}`}>
		// 		<div>
		// 			<Typography level='h3'>{file.title}</Typography>
		// 		</div>
		// 	</Link>
		// );
	);
};

const styles = {
	header: {
		margin: '3em 0',
	},
	main: {
		maxWidth: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '2em',
		paddingTop: 0,
		flexDirection: 'column',
	},

	gridItem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid black',
	},
	grid: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
		gridRowGap: '8rem',
		gridColumnGap: '5rem',
	},
	gridcontainer: {
		width: '90%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 8rem',
		boxSizing: 'border-box',
	},
	searchbar: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '1rem 0 5rem 0',
		width: '90%',
		// border: '1px solid gray',
		padding: '1rem',
		boxSizing: 'border-box',
	},

	searchSpacer: {
		width: '80%',
		height: '50px',
		border: '5px solid #ff5349',
		fontSize: '2em',
	},

	searchbutton: {
		height: '50px',
	},

	searchactivetext: {
		margin: '1rem 0 0 0 ',
		color: 'gray',
	},
};

export default HomePage;
