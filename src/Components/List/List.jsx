import React, { useState, useEffect, useContext } from 'react';
import { Flex, Pagination } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';


function List({ list, setList }) {
	const { settings } = useContext(SettingsContext);
	const { showState, pageCount } = settings;
	const [activePage, setPage] = useState(1);
	const [modifiedList, setModifiedList] = useState([]);


	useEffect(() => {
		console.log('showState', showState);
		setModifiedList(
			list
				.reduce((accumulator, item) => {
					console.log('!item.complete', !item.complete);
					console.log('!settings?.showState', !showState);
					if ((!item.complete || !showState)) {
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
		<Flex
		mih={50}
		// bg="rgba(0, 0, 0, .3)"
		gap="xs"
		align="flex-start"
		justify="center"
		direction="column"
		wrap="wrap"
	>
		{modifiedList.filter((item, idx) => idx >= (activePage - 1) * pageCount && idx < activePage * pageCount)}
			<Pagination
				value={activePage}
				onChange={setPage}
				total={Math.ceil(modifiedList.length / pageCount) || 1} />
		</Flex>
	)
}

export default List