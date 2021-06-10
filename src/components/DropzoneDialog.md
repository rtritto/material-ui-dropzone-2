### Import

```jsx static
import { DropzoneDialog } from 'material-ui-dropzone-2'
```

### Basic usage

```jsx
import Button from '@material-ui/core/Button'

const [open, setOpen] = React.useState(false)

<div>
	<Button
		color="primary"
		onClick={() => setOpen(true)}
		variant="contained"
	>
		Add Image
	</Button>

	<DropzoneDialog
		acceptedFiles={['image/*']}
		cancelButtonText="cancel"
		submitButtonText="submit"
		maxFileSize={5000000}
		open={open}
		onClose={() => setOpen(false)}
		onSave={(files) => {
			console.log('Files:', files)
			setOpen(false)
		}}
		previewType="below"
		showFileNamesInPreview
	/>
</div>
```