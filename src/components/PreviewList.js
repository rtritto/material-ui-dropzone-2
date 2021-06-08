import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import DeleteIcon from '@material-ui/icons/Delete';
import {isImage as isImageCheck} from '../helpers';
import clsx from 'clsx';
import * as React from 'react';
import PropTypes from 'prop-types';

const styles = ({palette, shape, spacing}) => ({
    root: {
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        margin: 0,
        backgroundColor: 'rgba(255,255,255,0.87)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    iconWrapper: {
        height: '100%',
        backgroundColor: '#f2f2f2',
    },
    fileIcon: {
        flexGrow: 1,
        height: '50%',
        marginTop: spacing(3),
    },
    fileIconBottom: {
        marginTop: spacing(9),
    },
});

function PreviewList({
    fileObjects,
    filesLimit,
    getCols,
    handleRemove,
    showFileNames,
    useChipsForPreview,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    previewType,
    classes,
    getPreviewIcon,
    width,
}) {
    const previewInside = previewType === 'inside';// extract to constants?
    const cols = getCols(width, filesLimit, fileObjects.length);

    if (useChipsForPreview) {
        return (
            <Grid
                spacing={1}
                direction="row"
                {...previewGridProps.container}
                container={true}
                className={clsx(classes.root, previewGridClasses.container)}
            >
                {fileObjects.map((fileObject, i) => {
                    return (
                        <Grid
                            {...previewGridProps.item}
                            item={true}
                            key={`${fileObject.file?.name ?? 'file'}-${i}`}
                            className={classes.imageContainer}
                        >
                            <Chip
                                variant="outlined"
                                {...previewChipProps}
                                label={fileObject.file.name}
                                onDelete={handleRemove(i)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        );
    }

    return (
        <GridList cols={cols}
            className={clsx({[classes.root]: previewInside}, previewGridClasses.container)}
            {...previewGridProps?.gridList}>
            {fileObjects.map((fileObject, i) => {
                const fileTitle = showFileNames && fileObject.file?.name;
                const isImage = isImageCheck(fileObject.file);

                return (
                    <GridListTile
                        key={`${fileObject.file?.name ?? 'file'}-${i}`}
                        className={clsx(previewGridClasses.gridListTile, {[classes.iconWrapper]: !isImage})}
                        {...previewGridProps?.gridListTitle}
                    >
                        {getPreviewIcon(
                            fileObject,
                            classes,
                            isImage,
                            previewGridProps?.gridListTitleBar?.titlePosition === 'top'
                        )}

                        <GridListTileBar
                            title={fileTitle}
                            actionIcon={
                                <IconButton
                                    onClick={handleRemove(i)}
                                    aria-label={'Delete'}
                                    className={clsx(previewGridClasses.removeIconButton, classes.icon)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            {...previewGridProps?.gridListTitleBar}
                        />

                    </GridListTile>
                );
            })}
        </GridList>
    );
}

PreviewList.propTypes = {
    classes: PropTypes.object.isRequired,
    fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    filesLimit: PropTypes.number.isRequired,
    getCols: PropTypes.func.isRequired,
    getPreviewIcon: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    previewType: PropTypes.string.isRequired,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles, {name: 'MuiDropzonePreviewList', withTheme: true})(PreviewList));
