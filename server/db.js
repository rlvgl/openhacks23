const { v4: uuidv4 } = require('uuid');

const addContent = async (client, content, title, tags, photoUrl) => {
	const query =
		'INSERT INTO files (id, published, content, title, tags, photoUrl) VALUES ($1, $2, $3, $4, $5, $6)';

	const uuid = await uuidv4();
	const date = new Date().toISOString();
	const vals = [uuid, date, content, title, tags, photoUrl];

	try {
		await client.query(query, vals, (err, res) => {
			if (err) throw err;
		});
		return uuid;
	} catch (e) {}
};

const getAllContent = async (client) => {
	try {
		const query = 'SELECT * FROM files';
		const res = await client.query(query, []);
		return res.rows;
	} catch (e) {}

	return [];
};

const getFileById = async (client, id) => {
	try {
		const query = `SELECT * FROM files WHERE id IN ('${id}')`;
		// console.log(id);
		const res = await client.query(query, []);
		return res.rows[0];
	} catch (e) {}
};

const getFileByTagName = async (client, tagName) => {
	try {
		const query = `SELECT * FROM files WHERE tags && ARRAY['${tagName}']`;
		const res = await client.query(query, []);
		return res.rows;
	} catch (e) {}
};

exports.addContent = addContent;
exports.getAllContent = getAllContent;
exports.getFileById = getFileById;
exports.getFileByTagName = getFileByTagName;
