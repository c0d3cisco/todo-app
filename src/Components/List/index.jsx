import React, { useState, useEffect, useContext } from 'react';
import { Card, Flex, Pagination, Group, Text, Badge } from '@mantine/core';
import { SettingsContext } from '../../Context/Settings';


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

	switch (sortBy) {
		case 'difficulty':
			list = list.sort((a, b) =>  a.difficulty - b.difficulty);
			break;
		case 'submitted':
			list = list.sort((a, b) =>  a.time - b.time);
			break;
		default:
			break;
	}

  const modifiedList = list.reduce((accumulator, item) => {
    if (!item.complete || showState) {
      const modifiedItem = (
        <div key={item.id} style={{width: '100%'}}>
          <Card shadow="sm" padding="lg" radius="sm" withBorder>
            <Card.Section style={{padding: '4px'}}>
              <Flex align="center" style={{borderBottom:'1px lightgray solid'}}>
                <Badge
                  color={item.complete ? 'red' : 'green'}
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.complete ? 'Completed' : 'Pending'}
                </Badge>
                <Text style={{paddingLeft: '1.5em'}} size="md">{item.assignee}</Text>
              </Flex>
            </Card.Section>
						<Card.Section style={{position: 'relative', padding: '16px'}}>
              <Text weight={400}>{item.text}</Text>
              <small style={{fontSize:'0.7em', position: 'absolute', padding: '8px', paddingRight: '1em', bottom: '0', right: '0'}}>Difficulty: {item.difficulty}</small>
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
