import React from 'react'
import { useEffect, useContext } from 'react'
import { SettingsContext } from '../../Context/Settings';
import Todo from '../Todo';
import List from '../List';
import { Grid } from '@mantine/core';
import styled from '@emotion/styled';
// import { useStyles } from '../../style.js';

const SizeGrid = styled(Grid)`
	width: 80%;
`;

function Main({ list, setList, incomplete, setIncomplete, }) {


	// const [list, setList] = useState([]);

	useEffect(() => {
		let incompleteCount = list.filter(item => !item.complete).length;
		setIncomplete(incompleteCount);
		document.title = `To Do List: ${incompleteCount}`;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	const { settings } = useContext(SettingsContext);


	return (
		<>
			<h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
			<SizeGrid>
				<Grid.Col span="auto">
					<Todo
						list={list}
						setList={setList}
						incomplete={incomplete}
						setIncomplete={setIncomplete}
					/>
				</Grid.Col>
				<Grid.Col span="auto">
					<List
						hideState={settings.hideState}
						list={list}
						setList={setList}
					/>
				</Grid.Col>
			</SizeGrid>
		</>
	)
}

export default Main