import { Link } from "react-router-dom"
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    padding: theme.spacing.md,
  },
	link: {
		color: theme.colors.gray[0],
		fontSize: theme.fontSizes.sm,
		paddingRight: theme.spacing.md,
		fontFamily: 'Verdana, sans-serif',
		textDecoration: 'none',
	}
}));

function Header() {
	const { classes } = useStyles();

	return (
		<div className={classes.navbar}>
			<Link className={classes.link} to="/" default >Home</Link>
			<Link className={classes.link} to="/settings">Settings</Link>
		</div>
	)
}


export default Header
	