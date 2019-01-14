import { connect } from 'react-redux';
import Form from '../ui/form/Form';
import action from '../Redux/actions/index'

const mapDispatchToFormProps = (dispatch) => (
 {
    postPoll: (data,header) => (
      dispatch(action.createPoll(data,header))
    ),
  }
);

export default connect(
  null,
  mapDispatchToFormProps
)(Form);