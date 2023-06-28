import React, { useState } from "react"

export const SettingsContext = React.createContext()

function SettingsManager(props) {
	const [hideState] = useState(false);
	const [pageCount] = useState(3);
	const [sortBy] = useState("difficulty")

	const state = {
		hideState,
		pageCount,
		sortBy,
		// sortField,
		// setHideState,
		// setPageCount,
		// setSortField,
	}

	return (
		<SettingsContext.Provider value={state}>
			{props.children}
		</SettingsContext.Provider>
	)
}

export default SettingsManager;