import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/joy';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';

export const sampleMD = `
An h1 header
============

Paragraphs are separated by a blank line.


  * this one
  * that one
  * the other one

Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺



An h2 header
------------

Here's a numbered list:

 1. first item
 2. second item
 3. third item

Note again how the actual text starts at 4 columns in (4 characters
from the left side). Here's a code sample:

    # Let me re-iterate ...
    for i in 1 .. 10 { do-something(i) }

As you probably guessed, indented 4 spaces. By the way, instead of
indenting the block, you can use delimited blocks, if you like:


~~~
define foobar() {
    print "Welcome to flavor country!";
}
~~~

(which makes copying & pasting easier). You can optionally mark the
delimited block for Pandoc to syntax highlight it:

~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print(i)
~~~



### An h3 header ###

Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 3. Dump everything in the pot and follow
    this algorithm:

        find wooden spoon
        uncover pot
        stir
        cover pot
        balance wooden spoon precariously on pot handle
        wait 10 minutes
        goto first step (or shut off burner when done)

    Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including
that last line which continues item 3 above).

`;

const FilePage = () => {
	// parse url to get id
	const url = window.location.href;
	const id = url.split('/')[url.split('/').length - 1];

	// set file state
	const [file, setFile] = useState({});

	useEffect(() => {
		axios.get(`http://localhost:8000/api/files/${id}`).then((res) => {
			setFile(res.data.rows);
		});
	}, []);

	return (
		<div style={styles.main}>
			<Navbar />
			<div style={styles.buttonContainer}>
				<Link to='/'>
					<Button> {'<- Go Home'}</Button>
				</Link>
			</div>
			<div>
				<ReactMarkdown>{file.content}</ReactMarkdown>
			</div>
		</div>
	);
};

const styles = {
	main: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		// border: '1px solid black',
		// padding: '5em',
		boxSizing: 'border-box',
		padding: '0 5em',
	},
	buttonContainer: {
		// border: '1px solid black',
		width: '100%',
		marginTop: '3em',
	},
	fileTitle: {
		margin: '2em 0',
	},
};

export default FilePage;
