import React, { Fragment, useState, useEffect } from 'react';




// material ui
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {addReport} from "../../actions/report";
import {useDispatch} from "react-redux";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const useStyles = makeStyles((theme) => ({
    reportVideo: {
        position: 'absolute',
        top: '73%',
        left: '80%',
        color: '#adb5bd',
    },
}));

//end material ui


const ReportVideo = ({image}) => {

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });


    const [formData, setFormData] = useState({
        social: '',
        image: null
    });

    const {social} = formData

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(addReport({social: social, image: image}))
        handleClose()
        setFormData({social: ''})
    };
    //material ui
    const classes = useStyles();


    // for instagram check
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    })

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className={classes.reportVideo}>
            <Button onClick={handleClickOpen}>
                <HelpOutlineIcon style={{color: '#cfd3dd'}}/>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Report Video</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you in the video? You can request the video to be taken
                        down by providing your social media that belongs to this video.
                    </DialogContentText>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedA} onChange={handleChange}
                        name="checkedA" color="primary"/>}
                        label="Instagram"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedB} onChange={handleChange}
                        name="checkedB" color="primary"/>}
                        label="Tik Tok"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedC} onChange={handleChange}
                        name="checkedC" color="primary"
                        />}
                        label="Triller"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Social media account"
                        type="text"
                        name="social"
                        value={social}
                        inputProps={{ maxLength: 20 }}
                        onChange={onChange}
                        required
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


export default ReportVideo;