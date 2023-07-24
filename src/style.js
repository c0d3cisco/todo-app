import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  form: {
    width: 'auto',
		backgroundColor: 'white',
  },
	formLabel: {
		width: '90%',
		fontSize: rem(16),
		display: 'flex',
		flexDirection: 'column',
	},
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
	},
	logInForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	mainHeader: {
		backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '100%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
	},

	mainContent: {
		width: '100%',
	},

	mainElement: {
		width: '80%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: 'auto',
	},

	footer: {
		width: '80%',
		margin: 'auto',
		textAlign: 'end'
	},
	loginInput: {
		width: '90%',
		margin: 'auto',
		paddingRight: theme.spacing.sm,
	},
	loginButton: {
		width: '90%',
		margin: 'auto',
		marginTop: theme.spacing.md,
	},


}));