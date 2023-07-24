import React, { useEffect, useContext, useState } from 'react'
import { useStyles } from '../../style';
import {
	Grid,
	Flex,
	Button,
	Switch,
	NumberInput,
	Card,
	Text,
	Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { SettingsContext } from '../../Context/Settings';
import { IconSettings } from '@tabler/icons-react';

function Setting({ list, setList }) {

	const { settings, setSettings, saveLocally } = useContext(SettingsContext);
	const { showState, pageCount, sortBy } = settings;
	const [ showSetting, setShowSetting ] = useState(false);


	const { classes } = useStyles();

	const form = useForm({
		initialValues: settings,
	})

	const setSettingsForm = (e, propertyName) => {
		let settingsLocal = {
			...settings,
			[propertyName]: e,
		}
		form.setValues(settingsLocal);
		setSettings(settingsLocal);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowSetting(!showSetting);
	}

	function handleMemoryChange(e) {
		// save list into local storage 
		if (settings.localMemory) {
			let stringifiedList = JSON.stringify(list);
			localStorage.setItem('list', stringifiedList);
		} else {
			list = localStorage.getItem('list');
		}

		setList(list);
		setSettingsForm(e.target.checked, 'localMemory')
	}

	useEffect(() => {
		saveLocally();
	})

	return (
		<>
			<h1 className={classes.mainHeader}><IconSettings />Manage Settings</h1>
			<Grid className={classes.mainContent}>
				<Grid.Col span={6}>
					<Card shadow="sm" padding="lg" radius="md" withBorder>
						<form className={classes.form} onSubmit={handleSubmit}>
							<Flex
								mih={50}
								gap="md"
								justify="flex-start"
								align="center"
								direction="column"
								wrap="wrap"
							>
								<h2 className={classes.formLabel} >Update Settings</h2>
								<Switch
									onChange={(e) => setSettingsForm(e.target.checked, 'showState')}
									label="Show Completed ToDos"
									checked={form.values?.showState}
								/>
								<Switch
									onChange={(e) => handleMemoryChange(e)}
									label={`Storage Location: ${settings.localMemory ? 'Local' : 'Cloud'}`}
									checked={form.values?.localMemory}
								/>
								<NumberInput
									onChange={(e) => setSettingsForm(e, 'pageCount')}
									value={form.values?.pageCount}
									placeholder="3"
									label="Items Per page"
								/>
								<Select
									label="Sort Keyword"
									onChange={(e) => setSettingsForm(e, 'sortBy')}
									placeholder={form.values?.sortBy}
									searchable
									nothingFound="No options"
									maxDropdownHeight={280}
									data={['difficulty', 'submitted']}
								/>
								<Button type="submit">Show New Settings</Button>
							</Flex>
						</form>
					</Card>
				</Grid.Col>
				<Grid.Col span={6}>
					{showSetting &&
						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Card.Section>
								<Flex
									mih={50}
									gap="md"
									justify="flex-start"
									align="center"
									direction="column"
									wrap="wrap" >
									<Text m="sm" size="xl">Updated Settings</Text>
									<Text m="sm" size="md">Show Completed ToDos: {showState ? "True" : "False"}</Text>
									<Text m="sm" size="md">Items Per page: {pageCount}</Text>
									<Text m="sm" size="md">Sort Keyword: {sortBy}</Text>
								</Flex>
							</Card.Section>
						</Card>}
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Setting