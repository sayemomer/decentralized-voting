import React from 'react';
import { connect } from 'react-redux';
import List from '../ui/list/List';

function Polls({polls,isFectching}) {

  return (
      <List polls={polls} isFectching={isFectching} />
  );

}


const mapStateToProps = (state) => {
 
  return {
    polls : state.polls.polls,
    isFectching : state.polls.isFectching
  };
};

export default connect(
  mapStateToProps,
)(Polls);