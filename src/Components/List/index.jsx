import React, { useState, useEffect, useContext } from 'react';
import { Stack, Pagination } from '@mantine/core';
import styled from '@emotion/styled'
import { SettingsContext } from '../../Context/Settings';

const SizedStack = styled(Stack)`
	width: 60%;
`;
//! the width above is weird and should not be hard-coded like this

function List({ hideState, list, setList }) {
	const { settings } = useContext(SettingsContext);
	const [activePage, setPage] = useState(1);
	const [modifiedList, setModifiedList] = useState([]);

	useEffect(() => {
		console.log('hideState', settings?.hideState);
		setModifiedList(
			list
				.reduce((accumulator, item) => {
					console.log('!item.complete', !item.complete);
					console.log('!settings?.hideState', !settings?.hideState);
					if ((!item.complete || !settings?.hideState)) {
						const modifiedItem = (
							<div key={item.id}>
								<p>{item.text}</p>
								<p><small>Assigned to: {item.assignee}</small></p>
								<p><small>Difficulty: {item.difficulty}</small></p>
								<div onClick={() => toggleComplete(item.id)}>Complete: {item.complete ? 'true' : 'false'}</div>
								<hr />
							</div>
						);
						accumulator.push(modifiedItem);
					}
					return accumulator;
				}, [])
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	function toggleComplete(id) {

		const items = list.map(item => {
			if (item.id === id) {
				item.complete = !item.complete; // boolean switch
			}
			return item;
		});
		setList(items);
		setModifiedList([...modifiedList]);
	}

	return (
		<SizedStack spacing="xs" h={300} sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] })}>
			{modifiedList.filter((item, idx) => idx >= (activePage - 1) * 3 && idx < activePage * 3)}
			<Pagination
				value={activePage}
				onChange={setPage}
				total={Math.ceil(modifiedList.length / 3) || 1} />
		</SizedStack>
	)
}

export default List