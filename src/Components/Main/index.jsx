import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { SettingsContext } from '../../Context/Settings';
import Todo from '../Todo';
import List from '../List';
import { Group } from '@mantine/core';

// import { useStyles } from '../../style.js';

function Main({ incomplete, setIncomplete, }) {

	const [list, setList] = useState([]);

	useEffect(() => {
		let incompleteCount = list.filter(item => !item.complete).length;
		setIncomplete(incompleteCount);
		document.title = `To Do List: ${incompleteCount}`;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	const { hideState } = useContext(SettingsContext);


	return (
			<Group position="center" spacing="sm">
				<Todo
					list={list}
					setList={setList}
					incomplete={incomplete}
					setIncomplete={setIncomplete}
				/>
				<List
					hideState={hideState}
					list={list}
					setList={setList}
				/>
			</Group>
	)
}

export default Main