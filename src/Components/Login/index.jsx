import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';
import { Button, Input, PasswordInput } from '@mantine/core';
import { useStyles } from '../../style';
import cookie from 'react-cookies';

function Login() {
	const { logout, login, isLoggedIn } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const { classes } = useStyles();

	//!
	const handleLogout = () => {
		logout();
		setUsername('');
		setPassword('');
		cookie.save('auth', 'empty');
	}

	const handleLogin = async () => {
		try {
			await login(username, password);
			setError(false);
		} catch (err) {
			console.error(err);
			setError(true);
		}
	}

	return (
		<>
			{isLoggedIn
				?
				<Button
					onClick={handleLogout}
					className={classes.link}
					variant="filled"
					color="red"
					size="sm"
				>
					Log Out
				</Button>
				:
				<>
					<Input
						className={classes.loginInput}
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						error={error}
					/>
					<PasswordInput
						className={classes.loginInput}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						withAsterisk
						error={error}
					/>
					<Button
						className={classes.link}
						variant="filled"
						color="red"
						size="sm"
						onClick={() => handleLogin()}
					>
						Log In
					</Button>
				</>}
		</>
	)
}

export default Login;
