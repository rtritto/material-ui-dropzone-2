import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { useMediaQuery, Grid, Chip, GridList, GridListTile, GridListTileBar, IconButton, SnackbarContent, Typography, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Delete, Close, CheckCircle, Warning, Error, Info, CloudUpload, AttachFile } from '@material-ui/icons';
import clsx from 'clsx';
import Dropzone from 'react-dropzone';

function isImage(file) {
  if (file.type.split('/')[0] === 'image') {
    return true;
  }

  return false;
}
function convertBytesToMbsOrKbs(filesize) {
  var size = '';

  if (filesize >= 1048576) {
    size = filesize / 1048576 + ' megabytes';
  } else if (filesize >= 1024) {
    size = filesize / 1024 + ' kilobytes';
  } else {
    size = filesize + ' bytes';
  }

  return size;
}
function createFileFromUrl(_x) {
  return _createFileFromUrl.apply(this, arguments);
}

function _createFileFromUrl() {
  _createFileFromUrl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
    var response, data, metadata, filename;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.blob();

          case 5:
            data = _context.sent;
            metadata = {
              type: data.type
            };
            filename = url.replace(/\?.+/, '').split('/').pop();
            return _context.abrupt("return", new File([data], filename, metadata));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createFileFromUrl.apply(this, arguments);
}

function readFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var _event$target;

      resolve(event == null ? void 0 : (_event$target = event.target) == null ? void 0 : _event$target.result);
    };

    reader.onerror = function (event) {
      reader.abort();
      reject(event);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * holds files in its state and provides some handler methods to add and remove from that state
 */

var useFiles = function useFiles(_ref) {
  var onChange = _ref.onChange,
      clearOnUnmount = _ref.clearOnUnmount,
      initialFiles = _ref.initialFiles,
      filesLimit = _ref.filesLimit,
      onDelete = _ref.onDelete;

  var _useState = useState([]),
      fileObjects = _useState[0],
      setFileObjects = _useState[1];

  var loadInitialFiles = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var fileObjs;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Promise.all(initialFiles.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(initialFile) {
                var file, data;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(typeof initialFile === 'string')) {
                          _context.next = 6;
                          break;
                        }

                        _context.next = 3;
                        return createFileFromUrl(initialFile);

                      case 3:
                        file = _context.sent;
                        _context.next = 7;
                        break;

                      case 6:
                        file = initialFile;

                      case 7:
                        _context.next = 9;
                        return readFile(file);

                      case 9:
                        data = _context.sent;
                        return _context.abrupt("return", {
                          file: file,
                          data: data
                        });

                      case 11:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 3:
            fileObjs = _context2.sent;
            setFileObjects(function (prev) {
              return [].concat(prev, fileObjs);
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  })), [initialFiles]);
  var handleAddFiles = useCallback(function (newFileObjects) {
    // Update component state
    setFileObjects(function (prev) {
      if (filesLimit <= 1) {
        return [newFileObjects[0]];
      }

      return [].concat(prev, newFileObjects);
    });
  }, [filesLimit]);
  var handleDeleteFile = useCallback(function (removedFileObj, removedFileObjIdx) {
    // Calculate remaining fileObjects array
    var remainingFileObjs = fileObjects.filter(function (fileObject, i) {
      return i !== removedFileObjIdx;
    }); // Notify removed file

    if (onDelete) {
      onDelete(removedFileObj.file);
    } // Update local state


    setFileObjects(remainingFileObjs);
  }, [onDelete, fileObjects]);

  var handleResetFiles = function handleResetFiles() {
    return setFileObjects([]);
  }; // When the fileObjects change, fire the onChange method if it's defined


  useEffect(function () {
    if (onChange) {
      onChange(fileObjects.map(function (fileObject) {
        return fileObject.file;
      }));
    }
  }, [fileObjects, onChange]); // Initialize the files when the hook is loaded

  useEffect(function () {
    loadInitialFiles();
    return function () {
      if (clearOnUnmount) {
        setFileObjects([]);
      }
    };
  }, [clearOnUnmount, loadInitialFiles]);
  return {
    fileObjects: fileObjects,
    handleAddFiles: handleAddFiles,
    handleDeleteFile: handleDeleteFile,
    handleResetFiles: handleResetFiles
  };
};

/**
 * Holds state required to utilize the snackbar and provides handlers to send messages via the snackbar
 */

var useSnackbar = function useSnackbar(onAlert) {
  var _useState = useState({
    open: false,
    message: '',
    variant: 'success'
  }),
      state = _useState[0],
      setState = _useState[1];

  var sendMessage = useCallback(function (message, variant) {
    setState({
      open: true,
      message: message,
      variant: variant
    });

    if (onAlert) {
      onAlert(message, variant);
    }
  }, [onAlert]);
  var handleCloseSnackbar = useCallback(function () {
    setState(function (prev) {
      return _extends({}, prev, {
        open: false
      });
    });
  }, []);
  return {
    handleCloseSnackbar: handleCloseSnackbar,
    sendMessage: sendMessage,
    snackbarMessage: state.message,
    snackbarOpen: state.open,
    snackbarVariant: state.variant
  };
};

/**
 * Returns xs,sm,md,lg or xl depending on the screenSize
 * @see https://material-ui.com/components/use-media-query/#migrating-from-withwidth
 */

var useWidth = function useWidth() {
  var theme = useTheme();
  var keys = [].concat(theme.breakpoints.keys).reverse();
  return keys.reduce(function (output, key) {
    var matches = useMediaQuery(theme.breakpoints.up(key));
    return !output && matches ? key : output;
  }, null) || 'xs';
};

/**
 * Calculates the number of columns to use in the preview based on a function passed in
 * numberOfColumns is a state variable which will update every time the width of the
 * screen changes
 */

var useColumns = function useColumns(getCols, filesLimit, numberOfFileObjects) {
  var _useState = useState(1),
      numberOfColumns = _useState[0],
      setCols = _useState[1];

  var width = useWidth();
  useEffect(function () {
    var cols = getCols(width, filesLimit, numberOfFileObjects);
    setCols(cols);
  }, [filesLimit, getCols, numberOfFileObjects, width]);
  return numberOfColumns;
};

var _DeleteIcon;
var useStyles$2 = makeStyles(function (_ref) {
  var spacing = _ref.spacing;
  return {
    root: {
      alignItems: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      margin: 0,
      backgroundColor: 'rgba(255,255,255,0.87)'
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    iconWrapper: {
      height: '100%',
      backgroundColor: '#f2f2f2'
    },
    imageContainer: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      '&:hover $image': {
        opacity: 0.3
      },
      '&:hover $removeButton': {
        opacity: 1
      }
    },
    fileIcon: {
      flexGrow: 1,
      height: '50%',
      marginTop: spacing(3)
    },
    fileIconBottom: {
      marginTop: spacing(9)
    }
  };
}, {
  name: 'MuiDropzonePreviewList'
});

var PreviewList = function PreviewList(_ref2) {
  var fileObjects = _ref2.fileObjects,
      filesLimit = _ref2.filesLimit,
      getCols = _ref2.getCols,
      handleRemove = _ref2.handleRemove,
      showFileNames = _ref2.showFileNames,
      useChipsForPreview = _ref2.useChipsForPreview,
      previewChipProps = _ref2.previewChipProps,
      previewGridClasses = _ref2.previewGridClasses,
      previewGridProps = _ref2.previewGridProps,
      previewType = _ref2.previewType,
      getPreviewIcon = _ref2.getPreviewIcon,
      handlePreviewClick = _ref2.handlePreviewClick;
  var classes = useStyles$2();
  var cols = useColumns(getCols, filesLimit, fileObjects.length);
  var previewInside = previewType === 'inside';

  if (useChipsForPreview) {
    return /*#__PURE__*/React.createElement(Grid, _extends({
      spacing: 1,
      direction: "row"
    }, previewGridProps.container, {
      container: true,
      className: clsx(classes.root, previewGridClasses.container)
    }), fileObjects.map(function (fileObject, i) {
      var _fileObject$file$name, _fileObject$file;

      return /*#__PURE__*/React.createElement(Grid, _extends({}, previewGridProps.item, {
        item: true,
        key: ((_fileObject$file$name = (_fileObject$file = fileObject.file) == null ? void 0 : _fileObject$file.name) != null ? _fileObject$file$name : 'file') + "-" + i,
        className: classes.imageContainer
      }), /*#__PURE__*/React.createElement(Chip, _extends({
        variant: "outlined"
      }, previewChipProps, {
        label: fileObject.file.name,
        onDelete: handleRemove(i)
      })));
    }));
  }

  return /*#__PURE__*/React.createElement(GridList, _extends({
    cols: cols,
    className: clsx(previewGridClasses.container, previewInside && classes.root)
  }, previewGridProps == null ? void 0 : previewGridProps.gridList), fileObjects.map(function (fileObject, i) {
    var _fileObject$file2, _fileObject$file$name2, _fileObject$file3, _previewGridProps$gri;

    var fileTitle = showFileNames && ((_fileObject$file2 = fileObject.file) == null ? void 0 : _fileObject$file2.name);
    var isImage$1 = isImage(fileObject.file);
    return /*#__PURE__*/React.createElement(GridListTile, _extends({
      key: ((_fileObject$file$name2 = (_fileObject$file3 = fileObject.file) == null ? void 0 : _fileObject$file3.name) != null ? _fileObject$file$name2 : 'file') + "-" + i,
      className: clsx(previewGridClasses.gridListTile, !isImage$1 && classes.iconWrapper),
      onClick: handlePreviewClick(i),
      onKeyDown: handlePreviewClick(i)
    }, previewGridProps == null ? void 0 : previewGridProps.gridListTitle), getPreviewIcon(fileObject, classes, isImage$1, (previewGridProps == null ? void 0 : (_previewGridProps$gri = previewGridProps.gridListTitleBar) == null ? void 0 : _previewGridProps$gri.titlePosition) === 'top'), /*#__PURE__*/React.createElement(GridListTileBar, _extends({
      title: fileTitle,
      actionIcon: /*#__PURE__*/React.createElement(IconButton, {
        onClick: handleRemove(i),
        "aria-label": "Delete",
        className: clsx(previewGridClasses.removeIconButton, classes.icon)
      }, _DeleteIcon || (_DeleteIcon = /*#__PURE__*/React.createElement(Delete, null)))
    }, previewGridProps == null ? void 0 : previewGridProps.gridListTitleBar)));
  }));
};

process.env.NODE_ENV !== "production" ? PreviewList.propTypes = {
  fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  filesLimit: PropTypes.number.isRequired,
  getCols: PropTypes.func.isRequired,
  getPreviewIcon: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handlePreviewClick: PropTypes.func.isRequired,
  previewChipProps: PropTypes.object,
  previewGridClasses: PropTypes.object,
  previewGridProps: PropTypes.object,
  previewType: PropTypes.string.isRequired,
  showFileNames: PropTypes.bool,
  useChipsForPreview: PropTypes.bool
} : void 0;

var _excluded$3 = ["className", "message", "onClose", "variant"];
var variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info
};
var useStyles$1 = makeStyles(function (theme) {
  return {
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
  };
}, {
  name: 'MuiDropzoneSnackbar'
});

function SnackbarContentWrapper(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      message = _ref.message,
      onClose = _ref.onClose,
      variant = _ref.variant,
      other = _objectWithoutPropertiesLoose(_ref, _excluded$3);

  var classes = useStyles$1();
  var Icon = variantIcon[variant];
  return /*#__PURE__*/React.createElement(SnackbarContent, _extends({
    className: clsx(classes[variant + "Alert"], className),
    "aria-describedby": "client-snackbar",
    message: /*#__PURE__*/React.createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, /*#__PURE__*/React.createElement(Icon, {
      className: classes.icon
    }), message),
    action: [/*#__PURE__*/React.createElement(IconButton, {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      className: classes.closeButton,
      onClick: onClose
    }, /*#__PURE__*/React.createElement(Close, {
      className: classes.icon
    }))]
  }, other));
}

process.env.NODE_ENV !== "production" ? SnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
} : void 0;

var useStyles = makeStyles(function (_ref) {
  var spacing = _ref.spacing,
      palette = _ref.palette,
      shape = _ref.shape;
  return {
    '@keyframes progress': {
      '0%': {
        backgroundPosition: '0 0'
      },
      '100%': {
        backgroundPosition: '-70px 0'
      }
    },
    root: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      minHeight: '250px',
      backgroundColor: palette.background.paper,
      border: 'dashed',
      borderColor: palette.divider,
      borderRadius: shape.borderRadius,
      boxSizing: 'border-box',
      cursor: 'pointer',
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    active: {
      animation: '$progress 2s linear infinite !important',
      backgroundImage: "repeating-linear-gradient(-45deg,\n\t\t\t\t" + palette.background.paper + ",\n\t\t\t\t" + palette.background.paper + " 25px,\n\t\t\t\t" + palette.divider + " 25px,\n\t\t\t\t" + palette.divider + " 50px)",
      backgroundSize: '150% 100%',
      border: 'solid',
      borderColor: palette.primary.light
    },
    invalid: {
      backgroundImage: "repeating-linear-gradient(-45deg,\n\t\t\t\t" + palette.error.light + ",\n\t\t\t\t" + palette.error.light + " 25px,\n\t\t\t\t" + palette.error.dark + " 25px,\n\t\t\t\t" + palette.error.dark + " 50px)",
      borderColor: palette.error.main
    },
    textContainer: {
      display: 'flex'
    },
    text: {
      marginBottom: spacing(3),
      marginTop: spacing(3)
    },
    icon: {
      width: 51,
      height: 51,
      color: palette.text.primary
    }
  };
}, {
  name: 'MuiDropzoneArea'
});

var shouldShowAlert = function shouldShowAlert(enabledAlerts, alertVariant) {
  if (!Array.isArray(enabledAlerts)) {
    return true;
  }

  return enabledAlerts.includes(alertVariant);
};

var defaultGetCols = function defaultGetCols(width, filesLimit) {
  var returnBelowLimit = function returnBelowLimit(number) {
    if (number < filesLimit) {
      return number;
    }

    return filesLimit;
  };

  switch (width) {
    case 'xs':
      return returnBelowLimit(1);

    case 'sm':
      return returnBelowLimit(2);

    case 'md':
      return returnBelowLimit(3);

    case 'lg':
      return returnBelowLimit(4);

    case 'xl':
      return returnBelowLimit(5);

    default:
      return returnBelowLimit(3);
  }
};

var defaultSnackbarAnchorOrigin = {
  horizontal: 'left',
  vertical: 'bottom'
};

var defaultGetPreviewIcon = function defaultGetPreviewIcon(fileObject, classes, isImage, titleBarTop) {
  if (isImage) {
    return /*#__PURE__*/React.createElement("img", {
      alt: "",
      className: classes.image,
      src: fileObject.data
    });
  }

  return /*#__PURE__*/React.createElement(Grid, {
    container: true,
    className: classes.iconWrapper,
    justify: "center"
  }, /*#__PURE__*/React.createElement(AttachFile, {
    className: clsx(classes.fileIcon, titleBarTop && classes.fileIconBottom)
  }));
};
/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */


var DropzoneAreaBase = function DropzoneAreaBase(_ref2) {
  var _PreviewList;

  var fileObjects = _ref2.fileObjects,
      filesLimit = _ref2.filesLimit,
      getFileAddedMessage = _ref2.getFileAddedMessage,
      getFileLimitExceedMessage = _ref2.getFileLimitExceedMessage,
      getFileRemovedMessage = _ref2.getFileRemovedMessage,
      getDropRejectMessage = _ref2.getDropRejectMessage,
      onAdd = _ref2.onAdd,
      onAlert = _ref2.onAlert,
      onDrop = _ref2.onDrop,
      onDropRejected = _ref2.onDropRejected,
      onDelete = _ref2.onDelete,
      onPreviewClick = _ref2.onPreviewClick,
      acceptedFiles = _ref2.acceptedFiles,
      alertSnackbarProps = _ref2.alertSnackbarProps,
      disableRejectionFeedback = _ref2.disableRejectionFeedback,
      dropzoneClass = _ref2.dropzoneClass,
      dropzoneParagraphClass = _ref2.dropzoneParagraphClass,
      dropzoneProps = _ref2.dropzoneProps,
      dropzoneText = _ref2.dropzoneText,
      getCols = _ref2.getCols,
      getPreviewIcon = _ref2.getPreviewIcon,
      Icon = _ref2.Icon,
      inputProps = _ref2.inputProps,
      maxFileSize = _ref2.maxFileSize,
      previewChipProps = _ref2.previewChipProps,
      previewGridClasses = _ref2.previewGridClasses,
      previewGridProps = _ref2.previewGridProps,
      previewText = _ref2.previewText,
      previewType = _ref2.previewType,
      showAlerts = _ref2.showAlerts,
      showFileNames = _ref2.showFileNames,
      useChipsForPreview = _ref2.useChipsForPreview;
  var classes = useStyles();

  var _useSnackbar = useSnackbar(onAlert),
      handleCloseSnackbar = _useSnackbar.handleCloseSnackbar,
      sendMessage = _useSnackbar.sendMessage,
      snackbarMessage = _useSnackbar.snackbarMessage,
      snackbarOpen = _useSnackbar.snackbarOpen,
      snackbarVariant = _useSnackbar.snackbarVariant;

  var handleDropAccepted = useCallback( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(droppedFiles, evt) {
      var message, fileObjs, successMessage;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(filesLimit > 1 && fileObjects.length + droppedFiles.length > filesLimit)) {
                _context2.next = 4;
                break;
              }

              message = getFileLimitExceedMessage(filesLimit);
              sendMessage(message, 'error');
              return _context2.abrupt("return");

            case 4:
              // Notify Drop event
              if (onDrop) {
                onDrop(droppedFiles, evt);
              } // Retrieve fileObjects data


              _context2.next = 7;
              return Promise.all(droppedFiles.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(file) {
                  var data;
                  return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return readFile(file);

                        case 2:
                          data = _context.sent;
                          return _context.abrupt("return", {
                            file: file,
                            data: data
                          });

                        case 4:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref4.apply(this, arguments);
                };
              }()));

            case 7:
              fileObjs = _context2.sent;

              // Notify added files
              if (onAdd) {
                onAdd(fileObjs);
              }

              successMessage = fileObjs.reduce(function (msg, fileObj) {
                return msg + getFileAddedMessage(fileObj.file.name);
              }, '');
              sendMessage(successMessage, 'success');

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }(), [filesLimit, fileObjects.length, onDrop, onAdd, sendMessage, getFileLimitExceedMessage, getFileAddedMessage]);
  var handleDropRejected = useCallback(function (rejectedFiles, evt) {
    var message = '';
    rejectedFiles.forEach(function (rejectedFile) {
      message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
    });

    if (onDropRejected) {
      onDropRejected(rejectedFiles, evt);
    }

    sendMessage(message, 'error');
  }, [acceptedFiles, getDropRejectMessage, maxFileSize, onDropRejected, sendMessage]);
  var handleRemove = useCallback(function (fileIndex) {
    return function (event) {
      event.stopPropagation(); // Find removed fileObject

      var removedFileObj = fileObjects[fileIndex]; // Notify removed file

      if (onDelete) {
        onDelete(removedFileObj, fileIndex);
      }

      var message = getFileRemovedMessage(removedFileObj.file.name);
      sendMessage(message, 'info');
    };
  }, [fileObjects, onDelete, getFileRemovedMessage, sendMessage]);
  var handlePreviewClick = useCallback(function (fileIndex) {
    return function (event) {
      event.stopPropagation(); // Find previewed fileObject

      var previewedFileObj = fileObjects[fileIndex];
      onPreviewClick(previewedFileObj, fileIndex);
    };
  }, [fileObjects, onPreviewClick]);
  var acceptFiles = acceptedFiles == null ? void 0 : acceptedFiles.join(',');
  var isMultiple = filesLimit > 1;
  var someFiles = fileObjects.length > 0;
  var alertsEnabled = typeof showAlerts === 'boolean' && showAlerts || Array.isArray(showAlerts);
  var isAlertOpen = snackbarOpen && shouldShowAlert(showAlerts, snackbarVariant);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dropzone, _extends({}, dropzoneProps, {
    accept: acceptFiles,
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
    maxSize: maxFileSize,
    multiple: isMultiple
  }), function (_ref5) {
    var getRootProps = _ref5.getRootProps,
        getInputProps = _ref5.getInputProps,
        isDragActive = _ref5.isDragActive,
        isDragReject = _ref5.isDragReject;
    return /*#__PURE__*/React.createElement("div", getRootProps({
      className: clsx(classes.root, dropzoneClass, isDragActive && classes.active, !disableRejectionFeedback && isDragReject && classes.invalid)
    }), /*#__PURE__*/React.createElement("input", getInputProps(inputProps)), /*#__PURE__*/React.createElement(Grid, {
      container: true,
      className: classes.textContainer,
      direction: "column",
      justify: "center",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h5",
      component: "p",
      className: clsx(classes.text, dropzoneParagraphClass)
    }, dropzoneText), Icon ? /*#__PURE__*/React.createElement(Icon, {
      className: classes.icon
    }) : /*#__PURE__*/React.createElement(CloudUpload, {
      className: classes.icon
    })), someFiles && previewType === 'inside' && (_PreviewList || (_PreviewList = /*#__PURE__*/React.createElement(PreviewList, {
      fileObjects: fileObjects,
      filesLimit: filesLimit,
      getCols: getCols,
      handleRemove: handleRemove,
      getPreviewIcon: getPreviewIcon,
      showFileNames: showFileNames,
      useChipsForPreview: useChipsForPreview,
      previewChipProps: previewChipProps,
      previewGridClasses: previewGridClasses,
      previewGridProps: previewGridProps,
      previewType: previewType,
      handlePreviewClick: handlePreviewClick
    }))));
  }), someFiles && previewType === 'below' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Typography, {
    variant: "subtitle1",
    component: "span"
  }, previewText), /*#__PURE__*/React.createElement(PreviewList, {
    fileObjects: fileObjects,
    filesLimit: filesLimit,
    getCols: getCols,
    handleRemove: handleRemove,
    getPreviewIcon: getPreviewIcon,
    showFileNames: showFileNames,
    useChipsForPreview: useChipsForPreview,
    previewChipProps: previewChipProps,
    previewGridClasses: previewGridClasses,
    previewGridProps: previewGridProps,
    previewType: previewType,
    handlePreviewClick: handlePreviewClick
  })), alertsEnabled && /*#__PURE__*/React.createElement(Snackbar, _extends({
    anchorOrigin: defaultSnackbarAnchorOrigin,
    autoHideDuration: 6000
  }, alertSnackbarProps, {
    open: isAlertOpen,
    onClose: handleCloseSnackbar
  }), /*#__PURE__*/React.createElement(SnackbarContentWrapper, {
    onClose: handleCloseSnackbar,
    variant: snackbarVariant,
    message: snackbarMessage
  })));
};

DropzoneAreaBase.defaultProps = {
  acceptedFiles: [],
  filesLimit: 3,
  fileObjects: [],
  maxFileSize: 3000000,
  dropzoneText: 'Drag and drop a file here or click',
  previewText: 'Preview:',
  previewType: 'inside',
  disableRejectionFeedback: false,
  showFileNames: true,
  useChipsForPreview: false,
  previewChipProps: {},
  previewGridClasses: {},
  previewGridProps: {},
  showAlerts: true,
  alertSnackbarProps: {
    anchorOrigin: {
      horizontal: 'left',
      vertical: 'bottom'
    },
    autoHideDuration: 6000
  },
  getCols: defaultGetCols,
  getFileLimitExceedMessage: function getFileLimitExceedMessage(filesLimit) {
    return "Maximum allowed number of files exceeded. Only " + filesLimit + " allowed";
  },
  getFileAddedMessage: function getFileAddedMessage(fileName) {
    return "File " + fileName + " successfully added.";
  },
  getPreviewIcon: defaultGetPreviewIcon,
  getFileRemovedMessage: function getFileRemovedMessage(fileName) {
    return "File " + fileName + " removed.";
  },
  getDropRejectMessage: function getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize) {
    var message = "File " + rejectedFile.name + " was rejected. ";

    if (!acceptedFiles.includes(rejectedFile.type)) {
      message += 'File type not supported. ';
    }

    if (rejectedFile.size > maxFileSize) {
      message += "File is too big. Size limit is " + convertBytesToMbsOrKbs(maxFileSize) + ". ";
    }

    return message;
  },
  onPreviewClick: function onPreviewClick() {}
};
var FileObjectShape = PropTypes.shape({
  file: PropTypes.object,
  data: PropTypes.any
});
process.env.NODE_ENV !== "production" ? DropzoneAreaBase.propTypes = {
  /** A list of file types to accept.
   * @see See [here](https://react-dropzone.js.org/#section-accepting-specific-file-types) for more details.
   */
  acceptedFiles: PropTypes.arrayOf(PropTypes.string),

  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,

  /** Icon to be displayed inside the dropzone area. */
  Icon: PropTypes.elementType,

  /** Currently loaded files. */
  fileObjects: PropTypes.arrayOf(FileObjectShape),

  /** Maximum file size (in bytes) that the dropzone will accept. */
  maxFileSize: PropTypes.number,

  /** Text inside the dropzone. */
  dropzoneText: PropTypes.string,

  /** Custom CSS class name for dropzone container. */
  dropzoneClass: PropTypes.string,

  /** Custom CSS class name for text inside the container. */
  dropzoneParagraphClass: PropTypes.string,

  /** Disable feedback effect when dropping rejected files. */
  disableRejectionFeedback: PropTypes.bool,

  /** Shows file name under the dropzone image. */
  showFileNames: PropTypes.bool,

  /** Uses deletable Material-UI Chip components to display file names. */
  useChipsForPreview: PropTypes.bool,

  /**
   * Props to pass to the Material-UI Chip components.<br/>Requires `useChipsForPreview` prop to be `true`.
   *
   * @see See [Material-UI Chip](https://material-ui.com/api/chip/#props) for available values.
   */
  previewChipProps: PropTypes.object,

  /**
   * Custom CSS classNames for preview Grid components.<br/>
   * Should be in the form {container: string, item: string, image: string}.
   */
  previewGridClasses: PropTypes.object,

  /**
   * Props to pass to the Material-UI Grid components.<br/>
   * Should be in the form {container: GridProps, item: GridProps}.
   *
   * @see See [Material-UI Grid](https://material-ui.com/api/grid/#props) for available GridProps values.
   */
  previewGridProps: PropTypes.object,

  /** The label for the file preview section. */
  previewText: PropTypes.string,

  /** Determines whether previews are shown inside the dropzone area, below, or not at all. Acceptable values are 'inside', 'below', 'none'. */
  previewType: PropTypes.oneOf(['inside', 'below', 'none']),

  /**
   * Shows styled Material-UI Snackbar when files are dropped, deleted or rejected.
   *
   * - can be a boolean ("global" `true` or `false` for all alerts).
   * - can be an array, with values 'error', 'info', 'success' to select to view only certain alerts:
   *  - showAlerts={['error']} for only errors.
   *  - showAlerts={['error', 'info']} for both errors and info.
   *  - showAlerts={['error', 'success', 'info']} is same as showAlerts={true}.
   *  - showAlerts={[]} is same as showAlerts={false}.
   */
  showAlerts: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.oneOf(['error', 'success', 'info']))]),

  /**
   * Props to pass to the Material-UI Snackbar components.<br/>Requires `showAlerts` prop to be `true`.
   *
   * @see See [Material-UI Snackbar](https://material-ui.com/api/snackbar/#props) for available values.
   */
  alertSnackbarProps: PropTypes.object,

  /**
   * Props to pass to the Dropzone component.
   *
   * @see See [Dropzone props](https://react-dropzone.js.org/#src) for available values.
   */
  dropzoneProps: PropTypes.object,

  /**
   * Attributes applied to the input element.
   *
   * @see See [MDN Input File attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Additional_attributes) for available values.
   */
  inputProps: PropTypes.object,

  /**
   * A function which determines which the number of columns to display in the preview list
   *
   * *Default*: Returns a sensible number of columns depending on the screen size (i.e. xs=1, sm=2, md=3, lg=4, xl=5) without exceeding the filesLimit (e.g. There would be no point displaying 4 columns if the filesLimit is 3)
   *
   * @param {string} width Width prop from useWidth, this will be one of ['xs','sm','md','lg','xl'] depending on the current screen size
   * @param {number} filesLimit The `filesLimit` prop
   * @param {number} currentNumberOfFiles The number of files in the `state.fileObjects`
   */
  getCols: PropTypes.func,

  /**
   * Get alert message to display when files limit is exceed.
   *
   * *Default*: "Maximum allowed number of files exceeded. Only ${filesLimit} allowed"
   *
   * @param {number} filesLimit The `filesLimit` currently set for the component.
   */
  getFileLimitExceedMessage: PropTypes.func,

  /**
   * Get alert message to display when a new file is added.
   *
   * *Default*: "File ${fileName} successfully added."
   *
   * @param {string} fileName The newly added file name.
   */
  getFileAddedMessage: PropTypes.func,

  /**
   * Get alert message to display when a file is removed.
   *
   * *Default*: "File ${fileName} removed."
   *
   * @param {string} fileName The name of the removed file.
   */
  getFileRemovedMessage: PropTypes.func,

  /**
   * Get alert message to display when a file is rejected onDrop.
   *
   * *Default*: "File ${rejectedFile.name} was rejected."
   *
   * @param {Object} rejectedFile The file that got rejected
   * @param {string[]} acceptedFiles The `acceptedFiles` prop currently set for the component
   * @param {number} maxFileSize The `maxFileSize` prop currently set for the component
   */
  getDropRejectMessage: PropTypes.func,

  /**
   * A function which determines which icon to display for a file preview.
   *
   * *Default*: If its an image then displays a preview the image, otherwise it will display an attachment icon
   *
   * @param {FileObject} objectFile The file which the preview will belong to
   * @param {Object} classes The classes for the file preview icon, in the default case we use the 'image' className.
   */
  getPreviewIcon: PropTypes.func,

  /**
   * Fired when new files are added to dropzone.
   *
   * @param {FileObject[]} newFiles The new files added to the dropzone.
   */
  onAdd: PropTypes.func,

  /**
   * Fired when an alert is triggered.
   *
   * @param {string} message Alert message.
   * @param {string} variant One of "error", "info", "success".
   */
  onAlert: PropTypes.func,

  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {FileObject} deletedFileObject The file that was removed.
   * @param {number} index The index of the removed file object.
   */
  onDelete: PropTypes.func,

  /**
   * Fired when the user drops files into the dropzone.
   *
   * @param {File[]} droppedFiles All the files dropped into the dropzone.
   * @param {Event} event The react-dropzone drop event.
   */
  onDrop: PropTypes.func,

  /**
   * Fired when a file is rejected because of wrong file type, size or goes beyond the filesLimit.
   *
   * @param {File[]} rejectedFiles All the rejected files.
   * @param {Event} event The react-dropzone drop event.
   */
  onDropRejected: PropTypes.func,

  /**
   * Fired when the user click que preview icon in the image. If this props was not informed, the preview icon doesn't appears.
   *
   * @param {File} clickedFile File was clicked.
   * @param {number} index The index of clicked file object.
   */
  onPreviewClick: PropTypes.func
} : void 0;

var _excluded$2 = ["clearOnUnmount", "initialFiles", "onChange", "onDelete", "filesLimit"];
/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */

var DropzoneArea = function DropzoneArea(_ref) {
  var clearOnUnmount = _ref.clearOnUnmount,
      initialFiles = _ref.initialFiles,
      onChange = _ref.onChange,
      onDelete = _ref.onDelete,
      filesLimit = _ref.filesLimit,
      dropzoneAreaBaseProps = _objectWithoutPropertiesLoose(_ref, _excluded$2);

  var _useFiles = useFiles({
    onChange: onChange,
    clearOnUnmount: clearOnUnmount,
    initialFiles: initialFiles,
    filesLimit: filesLimit,
    onDelete: onDelete
  }),
      handleDeleteFile = _useFiles.handleDeleteFile,
      handleAddFiles = _useFiles.handleAddFiles,
      fileObjects = _useFiles.fileObjects;

  return /*#__PURE__*/React.createElement(DropzoneAreaBase, _extends({}, dropzoneAreaBaseProps, {
    fileObjects: fileObjects,
    onAdd: handleAddFiles,
    onDelete: handleDeleteFile
  }));
};

DropzoneArea.defaultProps = {
  clearOnUnmount: true,
  filesLimit: 3,
  initialFiles: []
};
process.env.NODE_ENV !== "production" ? DropzoneArea.propTypes = _extends({}, DropzoneAreaBase.propTypes, {
  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,

  /** List containing File objects or URL strings.<br/>
   * **Note:** Please take care of CORS.
   */
  initialFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])),

  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,

  /**
   * Fired when the files inside dropzone change.
   *
   * @param {File[]} loadedFiles All the files currently loaded into the dropzone.
   */
  onChange: PropTypes.func,

  /**
   * Fired when a file is deleted from the previews panel.
   *
   * @param {File} deletedFile The file that was removed.
   */
  onDelete: PropTypes.func
}) : void 0;

var _excluded$1 = ["cancelButtonText", "dialogProps", "dialogTitle", "fullWidth", "maxWidth", "onClose", "onSave", "open", "submitButtonText"];
/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */

var DropzoneDialogBase = function DropzoneDialogBase(_ref) {
  var cancelButtonText = _ref.cancelButtonText,
      dialogProps = _ref.dialogProps,
      dialogTitle = _ref.dialogTitle,
      fullWidth = _ref.fullWidth,
      maxWidth = _ref.maxWidth,
      onClose = _ref.onClose,
      onSave = _ref.onSave,
      open = _ref.open,
      submitButtonText = _ref.submitButtonText,
      dropzoneAreaProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  // Submit button state
  var submitDisabled = dropzoneAreaProps.fileObjects.length === 0;
  return /*#__PURE__*/React.createElement(Dialog, _extends({}, dialogProps, {
    fullWidth: fullWidth,
    maxWidth: maxWidth,
    onClose: onClose,
    open: open
  }), /*#__PURE__*/React.createElement(DialogTitle, null, dialogTitle), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DropzoneAreaBase, dropzoneAreaProps)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    onClick: onClose
  }, cancelButtonText), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    disabled: submitDisabled,
    onClick: onSave
  }, submitButtonText)));
};

DropzoneDialogBase.defaultProps = {
  open: false,
  cancelButtonText: 'Cancel',
  dialogProps: {},
  dialogTitle: 'Upload file',
  fullWidth: true,
  maxWidth: 'sm',
  submitButtonText: 'Submit',
  showPreviews: true,
  showPreviewsInDropzone: false,
  showFileNamesInPreview: true
};
process.env.NODE_ENV !== "production" ? DropzoneDialogBase.propTypes = _extends({}, DropzoneAreaBase.propTypes, {
  /** Sets whether the dialog is open or closed. */
  open: PropTypes.bool,

  /** The Dialog title. */
  dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Props to pass to the Material-UI Dialog components.
   * @see See [Material-UI Dialog](https://material-ui.com/api/dialog/#props) for available values.
   */
  dialogProps: PropTypes.object,

  /**
   * If `true`, the dialog stretches to `maxWidth`.<br/>
   * Notice that the dialog width grow is limited by the default margin.
   */
  fullWidth: PropTypes.bool,

  /**
   * Determine the max-width of the dialog. The dialog width grows with the size of the screen.<br/>
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.string,

  /** Cancel button text in dialog. */
  cancelButtonText: PropTypes.string,

  /** Submit button text in dialog. */
  submitButtonText: PropTypes.string,

  /**
   * Fired when the modal is closed.
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onClose: PropTypes.func,

  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {SyntheticEvent} event The react `SyntheticEvent`
   */
  onSave: PropTypes.func,

  /**
   * Shows previews **BELOW** the dropzone.<br/>
   * **Note:** By default previews show up under in the Dialog and inside in the standalone.
   */
  showPreviews: PropTypes.bool,

  /** Shows preview **INSIDE** the dropzone area. */
  showPreviewsInDropzone: PropTypes.bool,

  /** Shows file name under the image. */
  showFileNamesInPreview: PropTypes.bool
}) : void 0;

var _excluded = ["clearOnUnmount", "onClose", "onSave", "initialFiles", "filesLimit", "onDelete", "onChange"];
/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */

var DropzoneDialog = function DropzoneDialog(_ref) {
  var clearOnUnmount = _ref.clearOnUnmount,
      onClose = _ref.onClose,
      onSave = _ref.onSave,
      initialFiles = _ref.initialFiles,
      filesLimit = _ref.filesLimit,
      onDelete = _ref.onDelete,
      onChange = _ref.onChange,
      other = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useFiles = useFiles({
    onChange: onChange,
    clearOnUnmount: clearOnUnmount,
    initialFiles: initialFiles,
    filesLimit: filesLimit,
    onDelete: onDelete
  }),
      handleDeleteFile = _useFiles.handleDeleteFile,
      handleAddFiles = _useFiles.handleAddFiles,
      fileObjects = _useFiles.fileObjects,
      handleResetFiles = _useFiles.handleResetFiles;

  var handleClose = function handleClose(evt) {
    if (onClose) {
      onClose(evt);
    }
  };

  var handleSave = function handleSave(evt) {
    if (onSave) {
      onSave(fileObjects.map(function (fileObject) {
        return fileObject.file;
      }), evt);
    }

    if (clearOnUnmount) {
      handleResetFiles();
    }
  };

  return /*#__PURE__*/React.createElement(DropzoneDialogBase, _extends({
    clearOnUnmount: clearOnUnmount,
    initialFiles: initialFiles,
    filesLimit: filesLimit,
    fileObjects: fileObjects,
    onAdd: handleAddFiles,
    onDelete: handleDeleteFile,
    onClose: handleClose,
    onChange: onChange,
    onSave: handleSave
  }, other));
};

DropzoneDialog.defaultProps = {
  clearOnUnmount: true,
  filesLimit: 3,
  initialFiles: []
};
process.env.NODE_ENV !== "production" ? DropzoneDialog.propTypes = _extends({}, DropzoneDialogBase.propTypes, {
  /** Clear uploaded files when component is unmounted. */
  clearOnUnmount: PropTypes.bool,

  /** Maximum number of files that can be loaded into the dropzone. */
  filesLimit: PropTypes.number,

  /** List containing File objects or URL strings.<br/>
   * **Note:** Please take care of CORS.
   */
  initialFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])),

  /**
   * Fired when the user clicks the Submit button.
   *
   * @param {File[]} files All the files currently inside the Dropzone.
   * @param {SyntheticEvent} event The react `SyntheticEvent`.
   */
  onSave: PropTypes.func
}) : void 0;

export { DropzoneArea, DropzoneAreaBase, DropzoneDialog, DropzoneDialogBase };
//# sourceMappingURL=index.es.js.map
