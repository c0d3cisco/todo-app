import React, { useEffect, useContext, useState } from 'react'
import { useStyles } from '../../style';
import { Grid, Flex, TextInput, Button, Switch, NumberInput, Card, Text, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { SettingsContext } from '../../Context/Settings';
import { IconSettings } from '@tabler/icons-react';

function Setting() {

	const { settings, setSettings, saveLocally } = useContext(SettingsContext);
	const { showState, pageCount, sortBy } = settings;
	const [showSetting, setShowSetting] = useState(false);

	const { classes } = useStyles();

	const form = useForm({
		initialValues: settings,
	})

	const setSettingsForm = (e, propertyName) => {
		console.log(e)
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

	useEffect(() => {
		console.log('showState', showSetting);
		saveLocally();
	})

	return (
		<>
			<h1 className={classes.mainHeader}><IconSettings />Manage Settings</h1>
			<Grid className={classes.mainContent}>
				<Grid.Col span={6}>
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
				</Grid.Col>
				<Grid.Col span={6}>
					{showSetting &&
						<Card shadow="sm" padding="lg" radius="md" withBorder>
							<Card.Section>
								<Flex
									mih={50}
									bg="rgba(0, 0, 0, .3)"
									gap="md"
									justify="flex-start"
									align="center"
									direction="column"
									wrap="wrap" >
									<h2>Updated Settings</h2>
									<Text size="md">Show Completed ToDos: {showState ? "True" : "False"}</Text>
									<Text size="md">Items Per page: {pageCount}</Text>
									<Text size="md">Sort Keyword: {sortBy}</Text>
								</Flex>
							</Card.Section>
						</Card>}
				</Grid.Col>
			</Grid>
		</>
	)
}

export default Setting