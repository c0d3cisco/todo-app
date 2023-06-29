import { useState, createContext, useContext } from "react"

export const SettingsContext = createContext()


export function SettingsManager(props) {
	const localStorageSettings = JSON.parse(localStorage.getItem('settingsToDoApp'));
	console.log('TESTEST', localStorageSettings);

const [settings, setSettings] = useState(localStorageSettings || {
		hideState: true,
		pageCount: 3,
		sortBy: "difficulty",
	});

	const value = {
		settings,
		setSettings
	}

	return (
		<SettingsContext.Provider value={value}>
			{props.children}
		</SettingsContext.Provider>
	)
}

export function useSettings() {
	return useContext(SettingsContext);
}

