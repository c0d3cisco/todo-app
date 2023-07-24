import React, { useState, useEffect, useContext } from 'react';
import { Card, Flex, Pagination, Grid, Text, Badge, CloseButton } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';
import Auth from '../Auth';
import { AuthContext } from '../../Context/Auth';
import axios from 'axios';


function List({ list, setList }) {
	const { settings } = useContext(SettingsContext);
	const { can } = useContext(AuthContext);
	const { showState, pageCount, sortBy, localMemory } = settings;
	const [activePage, setPage] = useState(1);

	useEffect(() => {
	}, [showState]);

	function toggleComplete(_id, complete) {
		if (!localMemory) {
			let obj = { _id, complete }
			axios.put(`https://api-js401.herokuapp.com/api/v1/todo/${_id}`, obj)
				.then();
			const updatedList = list.map((item) => {
				if (item._id === _id) {
					return { ...item, complete: !item.complete };
				}
				return item;
			});
			setList(updatedList);
		} else {
			const updatedList = list.map((item) => {
				if (item._id === _id) {
					return { ...item, complete: !item.complete };
				}
				return item;
			});
			let stringifiedList = JSON.stringify(updatedList);
			localStorage.setItem('list', stringifiedList);
			setList(updatedList);
		}
	}

	function deleteItem(id) {
		if (!localMemory) {
			axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`)
				.then(response => {
					const items = list.filter(item => item._id !== id);
					setList(items);
				})
		} else {
			const items = list.filter(item => item._id !== id);
			let stringifiedList = JSON.stringify(items);
			localStorage.setItem('list', stringifiedList);
			setList(items);
		}
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
				<div key={item._id} style={{ width: '100%' }}>
					<Card shadow="sm" padding="lg" radius="sm" withBorder>
						<Card.Section style={{ padding: '4px' }}>
							<Grid align="center" style={{ borderBottom: '1px lightgray solid' }}>
								<Grid.Col span={2}>
									<Badge
										variant='filled'
										color={item.complete ? 'red' : 'green'}
										onClick={() => can('update') ? toggleComplete(item._id, !item.complete) : console.log('nope')}
									>
										{item.complete ? 'Completed' : 'Pending'}
									</Badge>
								</Grid.Col>
								<Grid.Col span={1}>
									<Text style={{ paddingLeft: '1.5em' }} size="md">{item.assignee}</Text>
								</Grid.Col>
								<Auth capability="delete">
									<Grid.Col span={1} offset={8}>
										<CloseButton variant='subtle' onClick={() => deleteItem(item._id)} title="Delete Item" size="sm" />
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
