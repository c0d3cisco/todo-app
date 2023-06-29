import { Link } from "react-router-dom"


function Header() {

	return (
		<div>
			<Link to="/" default >Home</Link>
			<Link to="/settings">Settings</Link>
		</div>
	)
}


export default Header
