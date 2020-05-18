import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShopFromAStoreNearYou from '.';
import { selectPostcode } from '../../../store/shoppingIn/actions';
import { getError, isFetching } from '../../../store/shoppingIn/selectors';

const mapStateToProps = state => ({
  isFetching: isFetching(state),
  error: getError(state)
});

const mapDispatchToProps = dispatch => ({
  onClickSetPostcode: postcode => dispatch(selectPostcode(postcode))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShopFromAStoreNearYou));
