import React from 'react'
import { useStyles } from '../../style';

function Footer() {

	const { classes } = useStyles();

	return (
		<div className={classes.footer}>©2023 Code Fellows</div>
	)
}

export default Footer