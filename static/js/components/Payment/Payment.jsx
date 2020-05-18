import { connect } from 'react-redux';
import Payment from '.';
import { getOrder } from '../../store/api/selectors/order';
import { canAccessPaymentPage } from '../../store/api/selectors/payment';
import { messagesActions, messagesSelectors } from '../../store/messages';
import { getMessages } from '../../store/messages/selectors';
import { orderFailedDueToSlotExpiry } from '../../store/payment/selectors';
import formatPrice from '../../utils/formatPrice';

const mapStateToProps = state => {
  const { isFetching, confirmedPrice, checkoutUrl } = getOrder(state);
  return {
    canAccessPaymentPage: canAccessPaymentPage(state),
    isFetching,
    orderTotal: formatPrice(confirmedPrice),
    checkoutUrl,
    error: messagesSelectors.getMajorErrorSelector()({ messages: getMessages(state) }) || null,
    failedDueToSlotExpiry: orderFailedDueToSlotExpiry(state)
  };
};

const mapDispatchToProps = dispatch => ({
  removeMessageById: id => dispatch(messagesActions.removeMessageById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
