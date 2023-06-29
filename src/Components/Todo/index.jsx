import React, { useState } from 'react';
import useForm from '../../hooks/form';
import { Button, Flex } from '@mantine/core';
import { useStyles } from '../../style';


import { v4 as uuid } from 'uuid';


const Todo = ({ list, setList, incomplete, setIncomplete }) => {

  const { classes } = useStyles();

  const [defaultValues] = useState({
    difficulty: 4, // TODO: make this a dynamic state based on user input
  });

  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  // function deleteItem(id) {
  //   const items = list.filter( item => item.id !== id );
  //   setList(items);
  // }





  return (
    // <>
    <form className={classes.form} onSubmit={handleSubmit}>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <h2>Add To Do Item</h2>
        <label className={classes.formLabel}>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>
        <label className={classes.formLabel}>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>
        <label className={classes.formLabel}>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>
        <label>
          <Button type="submit">Add Item</Button>
        </label>
      </Flex>
    </form>
  );
};

export default Todo;
