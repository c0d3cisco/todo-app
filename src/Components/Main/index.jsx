import React from 'react'
import { useEffect, useContext } from 'react'
import { SettingsContext } from '../../Context/Settings';
import Todo from '../Todo';
import List from '../List';
import { Grid } from '@mantine/core';
import { useStyles } from '../../style';
import Auth from '../Auth';

function Main({ list, setList, incomplete, setIncomplete, }) {

	const { classes } = useStyles();

	useEffect(() => {
		let incompleteCount = list.filter(item => !item.complete).length;
		setIncomplete(incompleteCount);
		document.title = `To Do List: ${incompleteCount}`;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	const { settings } = useContext(SettingsContext);


	return (
		<>
			<h1 className={classes.mainHeader}>To Do List: {incomplete} items pending</h1>
			<Grid className={classes.mainContent}>
				<Auth capability="create">
				<Grid.Col sm={4}>
					<Todo
						list={list}
						setList={setList}
						incomplete={incomplete}
						setIncomplete={setIncomplete}
					/>
				</Grid.Col>
				</Auth>
				<Grid.Col sm="auto">
					<List
						showState={settings.showState}
						list={list}
						setList={setList}
					/>
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Main