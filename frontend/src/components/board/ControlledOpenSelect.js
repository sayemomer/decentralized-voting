import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PopOverButton from '../alert/PopOver';
import auth0Client from '../../auth/Auth';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    poll: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () => {
    const header ={
      headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
  }
    this.props.onVote(this.state.poll,header);
  }

  render() {
    const { classes } = this.props;

  const options=  this.props.options.map((op)=>(
          <MenuItem value={op} key={op} >{op}</MenuItem>     
    ));

    return (
      <form autoComplete="off">
        <Button className={classes.button} onClick={this.handleOpen}>
        I'd like to vote for...
        </Button>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Option</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.poll}
            onChange={this.handleChange}
            inputProps={{
              name: 'poll',
              id: 'demo-controlled-open-select',
            }}
          >

          {options}
            
          
          </Select>

          <PopOverButton handleSubmit={this.handleSubmit}/>

        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
