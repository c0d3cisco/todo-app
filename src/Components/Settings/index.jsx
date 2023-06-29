import React, { useEffect, useState, useContext } from 'react'
import styled from '@emotion/styled';
import { useStyles } from '../../style';
import { Grid, Flex, TextInput, Button, Switch, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SettingsContext } from '../../Context/Settings';

let show;
const SizeGrid = styled(Grid)`
	width: 80%;
`;

function Setting() {
	const { settings } = useContext(SettingsContext);
	let initialValues = settings;
	const [i, setI] = useState(0);
	const [formValues, setFormValues] = useState(initialValues)

	const form = useForm({
		initialValues: settings,
	})

	const { classes } = useStyles();

	useEffect(() => {
		console.log('TEST', form.values);
	})

	useEffect(() => {
		// console.log(i);
		if(i){
		const myJSON = JSON.stringify(form.values);
		localStorage.setItem("settingsToDoApp", myJSON);
		// console.log('DATA STORED', form.values)
		} 
		else {
		// 	const data = localStorage.getItem("settingsToDoApp");
		// 	const myJSON = JSON.parse(data);
		// 	setFormValues(myJSON);
			setI(i + 1)}
		// }
		})
	
	const setSettings = (e, propertyName) => {
		console.log(e)
		form.setValues({
			...form?.values,
			[propertyName]:  e,
		})
	}

	return (
		<>
			<h1>Settings</h1>
			<SizeGrid>
				<Grid.Col span="auto">
					<form className={classes.form}> 
						<Flex
							mih={50}
							bg="rgba(0, 0, 0, .3)"
							gap="md"
							justify="flex-start"
							align="center"
							direction="column"
							wrap="wrap"
						>
							<h2 className={classes.formLabel} >Update Settings</h2>
							<Switch
								onChange={(e) => setSettings(e.target.checked, 'hideState')}
								label="Show Completed ToDos"
								name='completeStatus'
								checked={form.values?.hideState}
							/>
							<NumberInput
								onChange={(e) => setSettings(e, 'pageCount')}
								value={form.values?.pageCount}
								placeholder="3"
								label="Items Per page"
								name='itemsPerPage'
							/>
							<TextInput
								onChange={(e) => setSettings(e.target.value, 'sortBy')}
								value={form.values?.sortBy}
								label="Sort Keyword"
								name='sortKeyWord'
							/>
							<Button>Show New Settings</Button>
						</Flex>
					</form>
				</Grid.Col>
				<Grid.Col span="auto">
				</Grid.Col>
			</SizeGrid>
		</>
	)
}

function handleChange() {

}

export default Setting