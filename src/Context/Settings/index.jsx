import { useState, createContext, useEffect, useContext } from "react"

export const SettingsContext = createContext()

export function SettingsManager(props) {
	const localStorageSettings = JSON.parse(localStorage.getItem('settingsToDoApp'));

const [settings, setSettings] = useState(localStorageSettings || {
		showState: true,
		pageCount: 3,
		sortBy: "difficulty",
		localMemory: true, 
	});

	const saveLocally = () => {
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

	const handleNavCSS = (theme) => {
		if(settings.localMemory){
			return theme.colors.blue[7]
		} else {
			return theme.colors.green[7]
		}
	}

	const value = {
		settings,
		setSettings,
		saveLocally,
		handleNavCSS
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
