import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { APIPath } from "../../CommonMethods/Fetch";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
export default function ContactUs() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    let history = useHistory();
    const image = "https://cdn.hswstatic.com/gif/loan-personal.jpg";
    const handlestart = () => {
        history.push(APIPath() + "success");
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button variant="outlined" color="secondary" style={{ marginRight: "20px", color: "white", border: "1px solid rgb(245 0 87)" }}>
                        Login
                    </Button>
                    <Button onClick={handlestart} variant="contained" color="secondary">
                        Get Started
                    </Button>
                </Toolbar>
            </AppBar>
            <div class="row" style={{ marginTop: "20px" }}>
                <div class="col-lg-3 col-md-3">
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    F
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Finance"
                        // subheader="September 14, 2016"
                        />
                        <CardMedia
                            style={{ paddingTop: "60%" }}
                            className={classes.media}
                            image="https://cdn.hswstatic.com/gif/loan-personal.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>
                </div>
                <div class="col-lg-3 col-md-3">
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    I
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Insurance"
                        // subheader="September 14, 2016"
                        />
                        <CardMedia
                            style={{ paddingTop: "60%" }}
                            className={classes.media}
                            image="https://4.imimg.com/data4/UI/PM/IMOB-28043730/insurance_social-media-a-game-changer_hd-500x500.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>
                </div>
                <div class="col-lg-3 col-md-3">
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    C
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Car Purchase"
                        // subheader="September 14, 2016"
                        />
                        <CardMedia
                            style={{ paddingTop: "60%" }}
                            className={classes.media}
                            image="https://assets.telegraphindia.com/telegraph/b85d0d67-e3b6-475a-b69b-a6d69f38e1a3.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>
                </div>
                <div class="col-lg-3 col-md-3">
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    C
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Estate Planning"
                        // subheader="September 14, 2016"
                        />
                        <CardMedia
                            style={{ paddingTop: "60%" }}
                            className={classes.media}
                            image="https://www.fishbeinlaw.com/wp-content/uploads/2015/07/HD-Bankrupcy1.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>

                </div>
            </div>
        </div>
    );
};