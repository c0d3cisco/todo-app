import React from 'react'

function List({ hideState, list, setList }) {

	function toggleComplete(id) {

		const items = list.map(item => {
			if (item.id === id) {
				item.complete = !item.complete; // boolean switch
			}
			return item;
		});

		setList(items);

	}

	return (
		<div>
			{list.map(item => (
				((!item.complete || !hideState) &&
					<div key={item.id}>
						<p>{item.text}</p>
						<p><small>Assigned to: {item.assignee}</small></p>
						<p><small>Difficulty: {item.difficulty}</small></p>
						<div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
						<hr />
					</div>)
			))}
		</div>
	)
}

export default List