import {
	ChipProps,
	DialogProps,
	GridListProps,
	GridListTileBarProps,
	GridListTileProps,
	SnackbarProps
} from '@material-ui/core'
import * as React from 'react'
import { DropEvent, DropzoneProps } from 'react-dropzone'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface FileObject {
	readonly file: File
	readonly data: string | ArrayBuffer | null
}

export interface PreviewIconProps {
	readonly classes: string
}

export type AlertType = 'error' | 'success' | 'info'

export type PreviewType = 'inside' | 'below' | 'none'

// DropzoneAreaBase

export type DropzoneAreaBaseClasses = {
	/** Material-UI class applied to the root Dropzone div */
	root: string
	/** Material-UI class applied to the Dropzone when 'active' */
	active: string
	/** Material-UI class applied to the Dropzone when 'invalid' */
	invalid: string
	/** Material-UI class applied to the Dropzone text container div */
	textContainer: string
	/** Material-UI class applied to the Dropzone text */
	text: string
	/** Material-UI class applied to the Dropzone icon */
	icon: string
}

export type DropzoneAreaBaseProps = {
	classes?: Partial<DropzoneAreaBaseClasses>
	acceptedFiles?: string[]
	fileObjects: FileObject[]
	filesLimit?: number
	Icon?: React.ComponentType
	maxFileSize?: number
	dropzoneText?: string
	previewText?: string
	previewType: PreviewType
	showFileNames?: boolean
	useChipsForPreview?: boolean
	previewChipProps?: ChipProps
	previewGridClasses?: {
		container?: string
		gridListTile?: string
		removeIconButton?: string
		previewIconButton?: string
	}
	previewGridProps?: {
		gridList?: GridListProps
		gridListTile?: GridListTileProps
		gridListTileBar: GridListTileBarProps
	}
	showAlerts?: boolean | AlertType[]
	alertSnackbarProps?: SnackbarProps
	dropzoneProps?: DropzoneProps
	inputProps?: React.HTMLProps<HTMLInputElement>
	clearOnUnmount?: boolean
	dropzoneClass?: string
	dropzoneParagraphClass?: string
	disableRejectionFeedback?: boolean
	onAdd?: (newFiles: FileObject[]) => void
	onAlert?: (message: string, variant: AlertType) => void
	onDelete?: (deletedFileObject: FileObject, index: number) => void
	onDrop?: (files: File[], event: DropEvent) => void
	onDropRejected?: (files: File[], event: DropEvent) => void
	getCols?: (
		width: string,
		filesLimit: number,
		currentNumberOfFiles?: number
	) => number
	getFileLimitExceedMessage?: (filesLimit: number) => string
	getFileAddedMessage?: (fileName: string) => string
	getFileRemovedMessage?: (fileName: string) => string
	getDropRejectMessage?: (
		rejectedFile: File,
		acceptedFiles: string[],
		maxFileSize: number
	) => string
	getPreviewIcon?: (
		file: FileObject,
		classes: PreviewIconProps
	) => React.ReactElement
}

export const DropzoneAreaBase: React.ComponentType<DropzoneAreaBaseProps>

// DropzoneArea

export type DropzoneAreaProps = Omit<
	DropzoneAreaBaseProps,
	'fileObjects' | 'onAdd' | 'onDelete'
> & {
	clearOnUnmount?: boolean
	initialFiles?: (File | string)[]
	onChange?: (files: File[]) => void
	onDelete?: (file: File) => void
}

export const DropzoneArea: React.ComponentType<DropzoneAreaProps>

// DropzoneDialogBase

export type DropzoneDialogBaseProps = DropzoneAreaBaseProps & {
	cancelButtonText?: string
	dialogProps?: DialogProps
	dialogTitle?: string | JSX.Element
	fullWidth?: boolean
	maxWidth?: string
	onClose?: (event: React.SyntheticEvent) => void
	onSave?: (event: React.SyntheticEvent) => void
	open?: boolean
	submitButtonText?: string
}

export const DropzoneDialogBase: React.ComponentType<DropzoneDialogBaseProps>

// DropzoneDialog

export type DropzoneDialogProps = Omit<
	DropzoneDialogBaseProps,
	'fileObjects' | 'onAdd' | 'onDelete' | 'onSave'
> & {
	clearOnUnmount?: boolean
	initialFiles?: (File | string)[]
	onSave?: (files: File[], event: React.SyntheticEvent) => void
	onDelete?: (file: File) => void
}

export const DropzoneDialog: React.ComponentType<DropzoneDialogProps>