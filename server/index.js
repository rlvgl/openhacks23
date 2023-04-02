const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');
const {
	addContent,
	getAllContent,
	getFileById,
	getFileByTagName,
} = require('./db');

dotenv.config();

const Connect = async () => {
	// Connect to database
	const connectionString = process.env.COCKROACH_CONNECTION_STRING;
	const pool = new Pool({
		connectionString,
	});

	const client = await pool.connect();
	console.log('connected to database');

	// INIT APP
	try {
		const app = express();
		app.use(cors());
		app.use(express.json());

		app.get('/api/files/:id', async (req, res) => {
			const id = req.params.id;
			const rows = await getFileById(client, id);
			console.log(rows);
			res.json({ rows: rows, msg: 'success' });
		});

		app.get('/api/files', async (req, res) => {
			// console.log(req.query.tags);

			if (req.query.tags) {
				const rows = await getFileByTagName(client, req.query.tags);
				res.json({ rows: rows, msg: 'success' });
			} else {
				const rows = await getAllContent(client);
				res.json({ rows: rows, msg: 'success' });
			}
		});

		app.post('/api/files', async (req, res) => {
			const content = req.body.content;
			const title = req.body.title || 'Untitled File';
			const tags = req.body.tags;
			const photoUrl = req.body.photoUrl;
			const id = await addContent(client, content, title, tags, photoUrl);
			res.json({ msg: 'success', id: id });
		});

		PORT = 8000;
		app.listen(PORT, () => console.log(`listening on ${PORT}`));
	} catch (e) {}
};

Connect();
