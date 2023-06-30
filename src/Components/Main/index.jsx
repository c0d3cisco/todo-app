import React from 'react'
import { useEffect, useContext } from 'react'
import { SettingsContext } from '../../Context/Settings';
import Todo from '../Todo';
import List from '../List';
import { Grid } from '@mantine/core';
import { useStyles } from '../../style';

function Main({ list, setList, incomplete, setIncomplete, }) {

	const { classes } = useStyles();

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
			<h1 className={classes.mainHeader}>To Do List: {incomplete} items pending</h1>
			<Grid className={classes.mainContent}>
				<Grid.Col span={4}>
					<Todo
						list={list}
						setList={setList}
						incomplete={incomplete}
						setIncomplete={setIncomplete}
					/>
				</Grid.Col>
				<Grid.Col span={8}>
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