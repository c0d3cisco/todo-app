import { Link } from "react-router-dom"
import { Button, createStyles, Grid, Input, PasswordInput } from '@mantine/core';
import { useStyles } from '../../style';
import Login from "../Login";



function Header() {
	const { classes } = useStyles();

	return (
		<Grid className={classes.navbar}>
			<Grid.Col span={3}>
				<Link className={classes.link} to="/" default >Home</Link>
				<Link className={classes.link} to="/settings">Settings</Link>
			</Grid.Col>
			<Grid.Col className={classes.logInForm} offset={3} span={6}>
				<Login />
			</Grid.Col>
		</Grid>
	)
}


export default Header
