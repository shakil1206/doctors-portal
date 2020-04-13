import React from 'react';
import './Apointment.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Apointment = (props) => {

    const { key, title, time, description } = props.item;



    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div className="col-md-4 cardStyle">
            <Card className={classes.root}>
                <CardContent>

                    <h4>{title}</h4>

                    <Typography variant="h6" component="h2">
                        {time}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className="buttonStyle d-flex justify-content-center" >
                    <Button onClick={() => props.handleModalOpen(title,time)} variant="contained" color="primary">Book Appointment</Button>
                </CardActions>
            </Card>

        </div>
    );
};

export default Apointment;