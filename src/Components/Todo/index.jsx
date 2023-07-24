import React, { useState } from 'react';
import useForm from '../../hooks/form';
import { Button, Flex, Slider } from '@mantine/core';
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
    item.time = new Date();
    console.log(item);
    setList([...list, item]);
  }

  return (
    // <>
    <form className={classes.form} onSubmit={handleSubmit}>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <h2>Add To Do Item</h2>
        <label className={classes.formLabel}>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>
        <label className={classes.formLabel}>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>
        <label className={classes.formLabel}>
          <span>Difficulty</span>
          <Slider onChange={handleChange} defaultValue={defaultValues.difficulty} min={1} max={5} name="difficulty" />
        </label>
        <label>
          <Button type="submit">Add Item</Button>
        </label>
      </Flex>
    </form>
  );
};

export default Todo;
