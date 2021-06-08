'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var Snackbar = _interopDefault(require('@material-ui/core/Snackbar'));
var Typography = _interopDefault(require('@material-ui/core/Typography'));
var Grid$1 = _interopDefault(require('@material-ui/core/Grid'));
var AttachFileIcon = _interopDefault(require('@material-ui/icons/AttachFile'));
var CloudUploadIcon = _interopDefault(require('@material-ui/icons/CloudUpload'));
var clsx = _interopDefault(require('clsx'));
var Dropzone = _interopDefault(require('react-dropzone'));
var makeStyles = _interopDefault(require('@material-ui/core/styles/makeStyles'));
var Chip = _interopDefault(require('@material-ui/core/Chip'));
var GridList = _interopDefault(require('@material-ui/core/GridList'));
var GridListTile = _interopDefault(require('@material-ui/core/GridListTile'));
var GridListTileBar = _interopDefault(require('@material-ui/core/GridListTileBar'));
var IconButton = _interopDefault(require('@material-ui/core/IconButton'));
var styles = require('@material-ui/core/styles');
var DeleteIcon = _interopDefault(require('@material-ui/icons/Delete'));
var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _toConsumableArray = _interopDefault(require('@babel/runtime/helpers/toConsumableArray'));
var useMediaQuery = _interopDefault(require('@material-ui/core/useMediaQuery'));
var SnackbarContent = _interopDefault(require('@material-ui/core/SnackbarContent'));
var CheckCircleIcon = _interopDefault(require('@material-ui/icons/CheckCircle'));
var CloseIcon = _interopDefault(require('@material-ui/icons/Close'));
var ErrorIcon = _interopDefault(require('@material-ui/icons/Error'));
var InfoIcon = _interopDefault(require('@material-ui/icons/Info'));
var WarningIcon = _interopDefault(require('@material-ui/icons/Warning'));
var Button = _interopDefault(require('@material-ui/core/Button'));
var Dialog = _interopDefault(require('@material-ui/core/Dialog'));
var DialogActions = _interopDefault(require('@material-ui/core/DialogActions'));
var DialogContent = _interopDefault(require('@material-ui/core/DialogContent'));
var DialogTitle = _interopDefault(require('@material-ui/core/DialogTitle'));

function isImage(file) {
  if (file.type.split('/')[0] === 'image') {
    return true;
  }
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

      resolve(event === null || event === void 0 ? void 0 : (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.result);
    };

    reader.onerror = function (event) {
      reader.abort();
      reject(event);
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Returns xs,sm,md,lg or xl depending on the screenSize
 * @see https://material-ui.com/components/use-media-query/#migrating-from-withwidth
 */

var useWidth = function useWidth() {
  var theme = styles.useTheme();

  var keys = _toConsumableArray(theme.breakpoints.keys).reverse();

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
  var _useState = React.useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      numberOfColumns = _useState2[0],
      setCols = _useState2[1];

  var width = useWidth();
  React.useEffect(function () {
    var cols = getCols(width, filesLimit, numberOfFileObjects);
    setCols(cols);
  }, [width]);
  return numberOfColumns;
};

var _DeleteIcon;
var useStyles = styles.makeStyles(function (_ref) {
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
      getPreviewIcon = _ref2.getPreviewIcon;
  var classes = useStyles();
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
        key: "".concat((_fileObject$file$name = (_fileObject$file = fileObject.file) === null || _fileObject$file === void 0 ? void 0 : _fileObject$file.name) !== null && _fileObject$file$name !== void 0 ? _fileObject$file$name : 'file', "-").concat(i),
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
  }, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.gridList), fileObjects.map(function (fileObject, i) {
    var _fileObject$file2, _fileObject$file$name2, _fileObject$file3, _previewGridProps$gri;

    var fileTitle = showFileNames && ((_fileObject$file2 = fileObject.file) === null || _fileObject$file2 === void 0 ? void 0 : _fileObject$file2.name);
    var isImage$1 = isImage(fileObject.file);
    return /*#__PURE__*/React.createElement(GridListTile, _extends({
      key: "".concat((_fileObject$file$name2 = (_fileObject$file3 = fileObject.file) === null || _fileObject$file3 === void 0 ? void 0 : _fileObject$file3.name) !== null && _fileObject$file$name2 !== void 0 ? _fileObject$file$name2 : 'file', "-").concat(i),
      className: clsx(previewGridClasses.gridListTile, !isImage$1 && classes.iconWrapper)
    }, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.gridListTitle), getPreviewIcon(fileObject, classes, isImage$1, (previewGridProps === null || previewGridProps === void 0 ? void 0 : (_previewGridProps$gri = previewGridProps.gridListTitleBar) === null || _previewGridProps$gri === void 0 ? void 0 : _previewGridProps$gri.titlePosition) === 'top'), /*#__PURE__*/React.createElement(GridListTileBar, _extends({
      title: fileTitle,
      actionIcon: /*#__PURE__*/React.createElement(IconButton, {
        onClick: handleRemove(i),
        "aria-label": 'Delete',
        className: clsx(previewGridClasses.removeIconButton, classes.icon)
      }, _DeleteIcon || (_DeleteIcon = /*#__PURE__*/React.createElement(DeleteIcon, null)))
    }, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.gridListTitleBar)));
  }));
};

process.env.NODE_ENV !== "production" ? PreviewList.propTypes = {
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
  useChipsForPreview: PropTypes.bool
} : void 0;

var _excluded = ["className", "message", "onClose", "variant"];
var variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
var useStyles$1 = styles.makeStyles(function (theme) {
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
  var className = _ref.className,
      message = _ref.message,
      onClose = _ref.onClose,
      variant = _ref.variant,
      other = _objectWithoutProperties(_ref, _excluded);

  var classes = useStyles$1();
  var Icon = variantIcon[variant];
  return /*#__PURE__*/React.createElement(SnackbarContent, _extends({
    className: clsx(classes["".concat(variant, "Alert")], className),
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
    }, /*#__PURE__*/React.createElement(CloseIcon, {
      className: classes.icon
    }))]
  }, other));
}

process.env.NODE_ENV !== "production" ? SnackbarContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
} : void 0;

/**
 * Holds state required to utilize the snackbar and provides handlers to send messages via the snackbar
 */

var useSnackbar = function useSnackbar(onAlert) {
  var _useState = React.useState({
    open: false,
    message: '',
    variant: 'success'
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var sendMessage = React.useCallback(function (message, variant) {
    setState({
      open: true,
      message: message,
      variant: variant
    });

    if (onAlert) {
      onAlert(message, variant);
    }
  }, [onAlert]);
  var handleCloseSnackbar = React.useCallback(function () {
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
    snackbarVariant: state.variant,
    snackbarOpen: state.open
  };
};

var useStyles$2 = makeStyles(function (_ref) {
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
      backgroundImage: "repeating-linear-gradient(-45deg, \n            ".concat(palette.background.paper, ", \n            ").concat(palette.background.paper, " 25px, \n            ").concat(palette.divider, " 25px, \n            ").concat(palette.divider, " 50px)"),
      backgroundSize: '150% 100%',
      border: 'solid',
      borderColor: palette.primary.light
    },
    invalid: {
      backgroundImage: "repeating-linear-gradient(-45deg, \n            ".concat(palette.error.light, ",\n            ").concat(palette.error.light, " 25px,\n            ").concat(palette.error.dark, " 25px,\n            ").concat(palette.error.dark, " 50px)"),
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
  }
};

var defaultSnackbarAnchorOrigin = {
  horizontal: 'left',
  vertical: 'bottom'
};

var defaultGetPreviewIcon = function defaultGetPreviewIcon(fileObject, classes, isImage, titleBarTop) {
  if (isImage) {
    return /*#__PURE__*/React.createElement("img", {
      className: classes.image,
      role: "presentation",
      src: fileObject.data
    });
  }

  return /*#__PURE__*/React.createElement(Grid$1, {
    container: true,
    className: classes.iconWrapper,
    justify: "center"
  }, /*#__PURE__*/React.createElement(AttachFileIcon, {
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
      acceptedFiles = _ref2.acceptedFiles,
      alertSnackbarProps = _ref2.alertSnackbarProps,
      disableRejectionFeedback = _ref2.disableRejectionFeedback,
      dropzoneClass = _ref2.dropzoneClass,
      dropzoneParagraphClass = _ref2.dropzoneParagraphClass,
      dropzoneProps = _ref2.dropzoneProps,
      dropzoneText = _ref2.dropzoneText,
      getCols = _ref2.getCols,
      getPreviewIcon = _ref2.getPreviewIcon,
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
  var classes = useStyles$2();

  var _useSnackbar = useSnackbar(onAlert),
      handleCloseSnackbar = _useSnackbar.handleCloseSnackbar,
      sendMessage = _useSnackbar.sendMessage,
      snackbarMessage = _useSnackbar.snackbarMessage,
      snackbarOpen = _useSnackbar.snackbarOpen,
      snackbarVariant = _useSnackbar.snackbarVariant;

  var handleDropAccepted = React.useCallback( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(acceptedFiles, evt) {
      var message, fileObjs, successMessage;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(filesLimit > 1 && fileObjects.length + acceptedFiles.length > filesLimit)) {
                _context2.next = 4;
                break;
              }

              message = getFileLimitExceedMessage(filesLimit);
              sendMessage(message, 'error');
              return _context2.abrupt("return");

            case 4:
              // Notify Drop event
              if (onDrop) {
                onDrop(acceptedFiles, evt);
              } // Retrieve fileObjects data


              _context2.next = 7;
              return Promise.all(acceptedFiles.map( /*#__PURE__*/function () {
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
  }(), [filesLimit, fileObjects, onDrop]);
  var handleDropRejected = React.useCallback(function (rejectedFiles, evt) {
    var message = '';

    if (fileObjects.length + rejectedFiles.length > filesLimit) {
      message = getFileLimitExceedMessage(filesLimit);
    } else {
      rejectedFiles.forEach(function (rejectedFile) {
        message = getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize);
      });
    }

    if (onDropRejected) {
      onDropRejected(rejectedFiles, evt);
    }

    sendMessage(message, 'error');
  }, [acceptedFiles, maxFileSize, onDropRejected]);
  var handleRemove = React.useCallback(function (fileIndex) {
    return function (event) {
      event.stopPropagation(); // Find removed fileObject

      var removedFileObj = fileObjects[fileIndex]; // Notify removed file

      if (onDelete) {
        onDelete(removedFileObj, fileIndex);
      }

      var message = getFileRemovedMessage(removedFileObj.file.name);
      sendMessage(message, 'info');
    };
  }, [fileObjects, onDelete, getFileRemovedMessage]);
  var acceptFiles = acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles.join(',');
  var isMultiple = filesLimit > 1;
  var someFiles = fileObjects.length > 0;
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
    return /*#__PURE__*/React.createElement("div", _extends({}, getRootProps(), {
      className: clsx(classes.root, dropzoneClass, isDragActive && classes.active, !disableRejectionFeedback && isDragReject && classes.invalid)
    }), /*#__PURE__*/React.createElement("input", _extends({}, inputProps, getInputProps())), /*#__PURE__*/React.createElement(Grid$1, {
      container: true,
      className: classes.textContainer,
      direction: "column",
      justify: "center",
      alignItems: "center"
    }, /*#__PURE__*/React.createElement(Typography, {
      variant: "h5",
      component: "p",
      className: clsx(classes.text, dropzoneParagraphClass)
    }, dropzoneText), /*#__PURE__*/React.createElement(CloudUploadIcon, {
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
      previewType: previewType
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
    previewType: previewType
  })), (typeof showAlerts === 'boolean' && showAlerts || Array.isArray(showAlerts) && showAlerts.includes(snackbarVariant)) && /*#__PURE__*/React.createElement(Snackbar, _extends({
    anchorOrigin: defaultSnackbarAnchorOrigin,
    autoHideDuration: 6000
  }, alertSnackbarProps, {
    open: snackbarOpen,
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
    return "Maximum allowed number of files exceeded. Only ".concat(filesLimit, " allowed");
  },
  getFileAddedMessage: function getFileAddedMessage(fileName) {
    return "File ".concat(fileName, " successfully added.");
  },
  getPreviewIcon: defaultGetPreviewIcon,
  getFileRemovedMessage: function getFileRemovedMessage(fileName) {
    return "File ".concat(fileName, " removed.");
  },
  getDropRejectMessage: function getDropRejectMessage(rejectedFile, acceptedFiles, maxFileSize) {
    var message = "File ".concat(rejectedFile.name, " was rejected. ");

    if (!acceptedFiles.includes(rejectedFile.type)) {
      message += 'File type not supported. ';
    }

    if (rejectedFile.size > maxFileSize) {
      message += 'File is too big. Size limit is ' + convertBytesToMbsOrKbs(maxFileSize) + '. ';
    }

    return message;
  }
};
var FileObjectShape = PropTypes.shape({
  file: PropTypes.object,
  data: PropTypes.any
});
process.env.NODE_ENV !== "production" ? DropzoneAreaBase.propTypes = _defineProperty({
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

  /** Shows file name under the image. */
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
  onDropRejected: PropTypes.func
}, "onAlert", PropTypes.func) : void 0;

/**
 * holds files in its state and provides some handler methods to add and remove from that state
 */

var useFiles = function useFiles(_ref) {
  var onChange = _ref.onChange,
      clearOnUnmount = _ref.clearOnUnmount,
      initialFiles = _ref.initialFiles,
      filesLimit = _ref.filesLimit,
      onDelete = _ref.onDelete;

  var _useState = React.useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      fileObjects = _useState2[0],
      setFileObjects = _useState2[1]; // When the fileObjects change, fire the onChange method if it's defined


  React.useEffect(function () {
    if (onChange) {
      onChange(fileObjects.map(function (fileObject) {
        return fileObject.file;
      }));
    }
  }, [fileObjects, onChange]); // Initialize the files when the hook is loaded

  React.useEffect(function () {
    loadInitialFiles();
    return function () {
      if (clearOnUnmount) {
        setFileObjects([]);
      }
    };
  }, [loadInitialFiles]);
  var loadInitialFiles = React.useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var fileObjs;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Promise.all(initialFiles.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(url) {
                var file, data;
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return createFileFromUrl(url);

                      case 2:
                        file = _context.sent;
                        _context.next = 5;
                        return readFile(file);

                      case 5:
                        data = _context.sent;
                        return _context.abrupt("return", {
                          file: file,
                          data: data
                        });

                      case 7:
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
              return [].concat(_toConsumableArray(prev), _toConsumableArray(fileObjs));
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
  var handleAddFiles = React.useCallback( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(newFileObjects) {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Update component state
              setFileObjects(function (prev) {
                if (filesLimit <= 1) {
                  return [newFileObjects[0]];
                }

                return [].concat(_toConsumableArray(prev), _toConsumableArray(newFileObjects));
              });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }(), [filesLimit]);
  var handleDeleteFile = React.useCallback(function (removedFileObj, removedFileObjIdx) {
    event.stopPropagation(); // Calculate remaining fileObjects array

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
  };

  return {
    handleAddFiles: handleAddFiles,
    handleDeleteFile: handleDeleteFile,
    handleResetFiles: handleResetFiles,
    fileObjects: fileObjects
  };
};

var _excluded$1 = ["clearOnUnmount", "initialFiles", "onChange", "onDelete", "filesLimit"];
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
      dropzoneAreaBaseProps = _objectWithoutProperties(_ref, _excluded$1);

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

var _excluded$2 = ["cancelButtonText", "dialogProps", "dialogTitle", "fullWidth", "maxWidth", "onClose", "onSave", "open", "submitButtonText"];
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
      dropzoneAreaProps = _objectWithoutProperties(_ref, _excluded$2);

  // Submit button state
  var submitDisabled = dropzoneAreaProps.fileObjects.length === 0;
  return /*#__PURE__*/React.createElement(Dialog, {
    cancelButtonText: cancelButtonText,
    dialogProps: dialogProps,
    dialogTitle: dialogTitle,
    maxWidth: maxWidth,
    onClose: onClose,
    onSave: onSave,
    open: open,
    fullWidth: fullWidth,
    fileObjects: dropzoneAreaProps.fileObjects
  }, /*#__PURE__*/React.createElement(DialogTitle, null, dialogTitle), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(DropzoneAreaBase, dropzoneAreaProps)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
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
  dialogTitle: 'Upload file',
  dialogProps: {},
  fullWidth: true,
  maxWidth: 'sm',
  cancelButtonText: 'Cancel',
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

var _excluded$3 = ["clearOnUnmount", "onClose", "onSave", "initialFiles", "filesLimit", "onDelete", "onChange"];
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
      other = _objectWithoutProperties(_ref, _excluded$3);

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
    onChange: onChange,
    fileObjects: fileObjects,
    onAdd: handleAddFiles,
    onDelete: handleDeleteFile,
    onClose: handleClose,
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

exports.DropzoneArea = DropzoneArea;
exports.DropzoneAreaBase = DropzoneAreaBase;
exports.DropzoneDialog = DropzoneDialog;
exports.DropzoneDialogBase = DropzoneDialogBase;
//# sourceMappingURL=index.js.map
