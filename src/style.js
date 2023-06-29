import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  form: {
    backgroundColor: theme.colors.violet[1],
    width: '33.33%',
    // margin: 'auto',
  },
	formLabel: {
		fontSize: rem(16),
		display: 'flex',
		flexDirection: 'column'
	},
}));