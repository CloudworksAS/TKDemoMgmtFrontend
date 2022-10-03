import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                        //color: '#ccc'
                    }}
                >
                    <CloseOutlined />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

function DialogComponent({ title, onClose, open, children }) {
    return (
        <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </BootstrapDialog>
    );
}

export default DialogComponent;
