import { IconButton, SnackbarContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
	CheckCircle as CheckCircleIcon,
	Close as CloseIcon,
	Error as ErrorIcon,
	Info as InfoIcon,
	Warning as WarningIcon
} from '@material-ui/icons'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon
}

const useStyles = makeStyles(
	(theme) => ({
		successAlert: {
			backgroundColor: theme.palette.success.main
		},
		errorAlert: {
			backgroundColor: theme.palette.error.main
		},
		infoAlert: {
			backgroundColor: theme.palette.info.main
		},
		warningAlert: {
			backgroundColor: theme.palette.warning.main
		},
		message: {
			display: 'flex',
			alignItems: 'center',
			'& > svg': {
				marginRight: theme.spacing(1)
			}
		},
		icon: {
			fontSize: 20,
			opacity: 0.9
		},
		closeButton: {}
	}),
	{ name: 'MuiDropzoneSnackbar' }
)

function SnackbarContentWrapper({
	className = '',
	message,
	onClose,
	variant,
	...other
}) {
	const classes = useStyles()
	const Icon = variantIcon[variant]

	return (
		<SnackbarContent
			className={clsx(classes[`${variant}Alert`], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={classes.icon} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>
			]}
			{...other}
		/>
	)
}

SnackbarContentWrapper.propTypes = {
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

export default SnackbarContentWrapper
