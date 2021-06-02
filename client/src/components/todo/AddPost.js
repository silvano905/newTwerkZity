import {useDispatch} from "react-redux";
import React, {Fragment,useState} from "react";
import {addPost} from "../../actions/post";

// material ui imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: 'linear-gradient(45deg, #1b3a4b 30%, #272640 90%)',

    },
    input: {
        display: 'none',
    },
    root: {
        '& .MuiInputBase-root': {
            color: 'white',

        },
        '& .MuiFormLabel-root': {
            color: 'white',

        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& label.Mui-focused': {
            color: 'white',
        },

    },
}));
//end material ui imports


const AddPost = () => {

    const dispatch = useDispatch()

    //material ui style
    const classes = useStyles();


    const [formData, setFormData] = useState({
        text: '',
        file: null,
        premium: false,
        views: ''
    });

    const [fileForm, setFileForm] = useState({
        file: null
    });


    const {text, views} = formData

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    // const fileSelectedHandler = (e) => {
    //     setFileForm({...fileForm, file: e.target.files[0]})
    // }

    const fileSelectedHandler = (e) => {
        setFormData({...formData, file: e.target.files[0]})
    }

    // const {file} = fileForm;
    const {file} = formData;


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('text', text);
        formData.append('views', views);
        formData.append('premium', premium);
        dispatch(addPost(formData));
        //to clean what the user wrote
        setFormData({text: ''})
        setFormData({views: ''})
    };

    const {premium} = formData


    return(
        <Fragment>

            <div style={{marginTop: 15}}>
                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                    <Grid item sm={11} lg={7} xs={11}>
                        <form onSubmit={onSubmit}>
                            <Paper elevation={3} className={classes.paper}>
                                <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                    <Grid item sm={11} lg={7} xs={11}>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="text"
                                            multiline
                                            name="text"
                                            rowsMax={4}
                                            value={text}
                                            onChange={onChange}
                                            required
                                            fullWidth
                                            className={classes.root}
                                        />
                                    </Grid>

                                    <Grid item sm={11} lg={7} xs={11}>
                                        <TextField
                                            id="standard-multiline-flexible"
                                            label="views"
                                            multiline
                                            name="views"
                                            rowsMax={4}
                                            value={views}
                                            onChange={onChange}
                                            required
                                            fullWidth
                                            className={classes.root}
                                        />
                                    </Grid>

                                    <Grid item sm={11} lg={7} xs={11}>
                                        <Switch
                                            checked={formData.premium}
                                            onClick={() => setFormData({ ...formData, premium: !premium })}
                                            color="primary"
                                            name="Premium"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />
                                    </Grid>


                                    <Grid item sm={11} lg={7} xs={11}>
                                        <input
                                            accept="image/*"
                                            className={classes.input}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={fileSelectedHandler}
                                        />
                                        <label htmlFor="contained-button-file">
                                            {file ?
                                                <Button variant="contained" component="span" style={{color: 'black', background: 'white', margin: 8}}>
                                                    {file.name}
                                                </Button>
                                                :
                                                <Button variant="contained" component="span" style={{color: 'black', background: 'white', margin: 8}}>
                                                    Select Image
                                                </Button>
                                            }
                                        </label>
                                    </Grid>


                                    <Grid item sm={11} lg={7} xs={11}>
                                        <Button type="submit" variant="contained" color="primary" style={{margin:5}}>Add</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
};

export default AddPost;