import React, { useState, useEffect, useContext } from 'react';
import { Card, Flex, Pagination, Grid, Text, Badge, CloseButton } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';
import Auth from '../Auth';


function List({ list, setList }) {
	const { settings } = useContext(SettingsContext);
	const { showState, pageCount, sortBy } = settings;
	const [activePage, setPage] = useState(1);

	useEffect(() => {
		console.log('showState', showState);
	}, [showState]);

	function toggleComplete(id) {
		const updatedList = list.map((item) => {
			if (item.id === id) {
				return { ...item, complete: !item.complete };
			}
			return item;
		});
		setList(updatedList);
	}

	function deleteItem(id) {
		const items = list.filter(item => item.id !== id);
		setList(items);
	}

	switch (sortBy) {
		case 'difficulty':
			list = list.sort((a, b) => a.difficulty - b.difficulty);
			break;
		case 'submitted':
			list = list.sort((a, b) => a.time - b.time);
			break;
		default:
			break;
	}

	const modifiedList = list.reduce((accumulator, item) => {
		if (!item.complete || showState) {
			const modifiedItem = (
				<div key={item.id} style={{ width: '100%' }}>
					<Card shadow="sm" padding="lg" radius="sm" withBorder>
						<Card.Section style={{ padding: '4px' }}>
							<Grid align="center" style={{ borderBottom: '1px lightgray solid' }}>
								<Grid.Col span={2}>
									<Badge
										variant='filled'
										color={item.complete ? 'red' : 'green'}
										onClick={() => toggleComplete(item.id)}
									>
										{item.complete ? 'Completed' : 'Pending'}
									</Badge>
								</Grid.Col>
								<Grid.Col span={1}>
									<Text style={{ paddingLeft: '1.5em' }} size="md">{item.assignee}</Text>
								</Grid.Col>
								<Auth capability="delete">
								<Grid.Col span={1} offset={8}>
									<CloseButton variant='subtle' onClick={() => deleteItem(item.id)} title="Delete Item" size="sm" />
								</Grid.Col>
								</Auth>
							</Grid>
						</Card.Section>
						<Card.Section style={{ position: 'relative', padding: '16px' }}>
							<Text weight={400}>{item.text}</Text>
							<Text size={16} align='right'><small> Difficulty: {item.difficulty} </small></Text>
						</Card.Section>
					</Card>
				</div>
			);
			accumulator.push(modifiedItem);
		}
		return accumulator;
	}, []);


	const paginatedList = modifiedList.slice((activePage - 1) * pageCount, activePage * pageCount);

	return (
		<Flex mih={50} gap="xs" align="flex-start" justify="center" direction="column" wrap="wrap">
			{paginatedList}
			<Pagination
				value={activePage}
				onChange={setPage}
				total={Math.ceil(modifiedList.length / pageCount) || 1}
			/>
		</Flex>
	);
}

export default List;
