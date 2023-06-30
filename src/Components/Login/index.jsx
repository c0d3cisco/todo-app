import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import { Button, Input, PasswordInput } from '@mantine/core';
import { useStyles } from '../../style';

function Login() {
	const { logout, login, isLoggedIn } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { classes } = useStyles();


	//!
	const handleLogout = () => {
		logout();
		setUsername('');
		setPassword('');
	}

	return (
		<>
			{!isLoggedIn
				?
				<>
					<Input
						className={classes.loginInput}
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<PasswordInput
						className={classes.loginInput}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						withAsterisk
					/>
					<Button
						className={classes.link}
						variant="filled"
						color="red"
						size="sm"
						onClick={() => login(username, password)}
					>
						Log In
					</Button>
				</>
				:
				<>
					<Button
						onClick={handleLogout}
						className={classes.link}
						variant="filled"
						color="red"
						size="sm"
					>
						Log Out
					</Button>
				</>}
		</>
	)
}

export default Login;
