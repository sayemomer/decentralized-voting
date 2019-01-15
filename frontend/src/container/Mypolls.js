import React from 'react';
import { connect } from 'react-redux';
import List from '../components/list/List';
import auth0Client from '../auth/Auth';

function MyPolls({polls,isFectching}) {

  return (
      <List polls={polls} isFectching={isFectching} myPoll={true} />
  );

}

const mapStateToProps = (state) => {

  const user = auth0Client.getProfile().name;
  const myPolls = state.polls.polls.filter((poll) => poll.username === user);
 
  return {
    polls : myPolls,
    isFectching : state.polls.isFectching
  };
};

export default connect(
  mapStateToProps,
)(MyPolls);