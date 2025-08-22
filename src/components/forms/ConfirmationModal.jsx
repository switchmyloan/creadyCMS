import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
// import { useCountry } from '@/CountruContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    color: '#000',
    padding: '14px 18px 0',
    fontSize: '24px',
}));

// Grow transition for zoom-in effect from center
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow in={props.open} ref={ref} {...props} timeout={300} />;
});

export default function ConfirmationModal({
    open,
    setOpen,
    handleConfirm,
    loading,
    setLoading,
    actionType,
    typeText
}) {
    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };

    // const { mode } = useCountry()
    const mode = 'light';

    const getActionMessage = () => {
        if (actionType === 'delete') {
            return 'Are you sure you want to delete this item?';
        }
        else if (actionType === 'edit') {
            return 'Are you sure you want to change the status?';
        } else if (actionType === 'other') {
            return typeText
        } else {
            return 'Warning!'
        }
        return '';
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{
                '& .MuiPaper-root': {
                    transform: open ? 'scale(1)' : 'scale(0.9)',
                    transition: 'transform 0.3s ease',
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Title className={`${mode == 'light' ? 'text-[#000]' : 'text-[#fff]'}`}>{actionType === 'delete' ? 'Confirm Delete' : actionType == 'other' ? 'Confirm' : 'Confirm Edit'}</Title>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        width: 24,
                        height: 24,
                        padding: 4
                        // color: theme.palette.grey[500],
                    })}
                >
                    X
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom className="p-[18px] pb-0 pt-0">
                    {getActionMessage()}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="secondary"
                    variant="contained"
                    size='small'
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    color={actionType === 'delete' ? 'error' : 'primary'}
                    disabled={loading}
                    variant="contained"
                    size='small'
                >
                    {loading ? (actionType === 'delete' ? 'Deleting...' : 'Updating...') : actionType === 'delete' ? 'Delete' : 'Confirm'}
                </Button>
            </DialogActions>
        </BootstrapDialog >
    );
}
