import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  form: {
    backgroundColor: theme.colors.violet[1],
    width: 'auto',
    // margin: 'auto',
  },
	formLabel: {
		fontSize: rem(16),
		display: 'flex',
		flexDirection: 'column'
	},
}));