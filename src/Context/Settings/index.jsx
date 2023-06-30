import { useState, createContext, useEffect } from "react"

export const SettingsContext = createContext()

export function SettingsManager(props) {
	const localStorageSettings = JSON.parse(localStorage.getItem('settingsToDoApp'));

const [settings, setSettings] = useState(localStorageSettings || {
		showState: true,
		pageCount: 3,
		sortBy: "difficulty",
	});

	const saveLocally = () => {
		console.log('settings', settings);
    localStorage.setItem(
      'settingsToDoApp', 
      JSON.stringify(settings)
      );
  }

	useEffect(() => {
		let storage = JSON.parse(localStorage.getItem('settingsToDoApp'))
		if(storage){
			setSettings(storage);
		}
	},[]) 

	const value = {
		settings,
		setSettings,
		saveLocally
	}

	return (
		<SettingsContext.Provider value={value}>
			{props.children}
		</SettingsContext.Provider>
	)
}
