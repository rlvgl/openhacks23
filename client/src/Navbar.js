import React from 'react';
import { Typography } from '@mui/joy';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div style={styles.nav}>
			<Link to='/'>
				<Typography level='h2' style={styles.navElement}>
					Phoenix Files
				</Typography>
			</Link>
			<Link to='/write'>
				<Typography level='h4' styles={styles.navElement}>
					Write
				</Typography>
			</Link>
		</div>
	);
};

const styles = {
	nav: {
		display: 'flex',
		width: '100%',
		padding: '2em 6em',
		justifyContent: 'space-between',
		boxSizing: 'border-box',
		alignItems: 'center',
	},
	navElement: {
		margin: '0 1em',
	},
};

export default Navbar;
