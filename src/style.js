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

}));