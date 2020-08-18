import React,{Component} from "react";
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input/Input";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";


const theme = createMuiTheme({
    palette: {
        primary:  {
            main: '#ffffff',
        }
    },
});

const css  =  {
    appBar: {
        backgroundColor: '#263238',
        boxShadow: 'none',

    },
    toolBar:{
        display: 'flex',
        flexDirection:'row',
        justifyContent : 'space-between',
    },
    inputSearch:{
        color:'#ffffff',
        width: '300px'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component{

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        }
    }

    openModalHandler = () => {
            this.setState({ modalIsOpen: true })
    }

    closeModal =()=>{
        this.setState({ modalIsOpen: false })
    }



        render()
        {
            return (
                <Box>
                    <AppBar position="static" style={css.appBar}>
                        <Toolbar style={css.toolBar}>
                            <IconButton edge="start" color="inherit">
                                <FastfoodIcon/>
                            </IconButton>
                            <Box className="search" style={css.search}>
                                <ThemeProvider theme={theme}>
                                    <Input type="text" style={css.inputSearch} color="primary"
                                           placeholder={'Search by Restaurant Name'}
                                           startAdornment={
                                               <InputAdornment position="start" color="primary">
                                                   <SearchIcon className="mag-glass" color="primary"/>
                                               </InputAdornment>
                                           }>
                                    </Input>
                                </ThemeProvider>
                            </Box>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={this.openModalHandler}
                                startIcon={<Icon size="small"><AccountCircleIcon/></Icon>}
                            >
                                Login
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen}
                           contentLabel="Login" onRequestClose={this.closeModal}
                            style={css.content}>
                    </Modal>

                </Box>
            );
        }
    }
export default Header;
