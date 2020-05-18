import { trim } from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  applyVoucherCode,
  clearVoucherError,
  removeVoucherCode
} from '../../../store/basket/actions';
import { getOrderVoucherCode } from '../../../store/order/selectors';
import Confirmation from '../../Notification/Confirmation';
import Spinner from '../../Loading/Spinner';
import InlineError from '../../OrderFulfilment/PostcodeSearch/InlineError'; // ! TODO: pull this up
import './VoucherCode.scss';
import { LinkInNewTab } from '../../Links';

const loading = () => ({
  onSubmit: () => null,
  button: () => <Spinner />
});

const apply = ({ dispatch, voucherCode }) => ({
  onSubmit: () => {
    dispatch(applyVoucherCode({ voucherCode: trim(voucherCode) }));
  },
  button: () => 'Apply'
});

const remove = ({ dispatch, setVoucherCode }) => ({
  onSubmit: () => {
    dispatch(removeVoucherCode());
    // could we respond to change in redux state rather than
    // setting this explicitly?
    setVoucherCode('');
  },
  button: () => 'Remove'
});

const actionFactory = ({
  dispatch,
  initialVoucherCode,
  isFetching,
  setVoucherCode,
  voucherCode
}) => {
  if (isFetching) {
    return loading();
  }

  return initialVoucherCode
    ? remove({ dispatch, setVoucherCode })
    : apply({ dispatch, voucherCode });
};

const VoucherCode = ({ isFetching }) => {
  const dispatch = useDispatch();
  const initialVoucherCode = useSelector(getOrderVoucherCode);
  const error = useSelector(s => s.order.errorVoucher);
  const [voucherCode, setVoucherCode] = useState(initialVoucherCode || '');
  const onChangeVoucherCode = e => {
    if (error) {
      dispatch(clearVoucherError());
    }
    setVoucherCode(e.target.value.toUpperCase());
  };

  const action = actionFactory({
    dispatch,
    initialVoucherCode,
    isFetching,
    setVoucherCode,
    voucherCode
  });

  const onSubmitVoucherCode = e => {
    e.preventDefault();

    action.onSubmit();
  };

  useEffect(() => {
    dispatch(clearVoucherError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="voucher-code" data-testid="voucher-code">
      <div className="form-item">
        <label htmlFor="voucher-code" className="form-label">
          Promotion code
        </label>
        <div className="form-item--searchbox">
          <span className="form-item--searchbox--input">
            <input
              className="form-input"
              data-testid="voucher-code-input"
              onChange={onChangeVoucherCode}
              type="text"
              value={voucherCode}
              disabled={!!initialVoucherCode}
            />
          </span>
          <button
            className="btn btn--secondary form-button"
            type="submit"
            disabled={voucherCode === ''}
            data-testid="voucher-code-button"
            onClick={onSubmitVoucherCode}
          >
            {action.button()}
          </button>
        </div>
        {initialVoucherCode && <Confirmation message="Promotion applied" />}
        <InlineError error={error} />

        <p className="voucher-code__terms-link">
          <LinkInNewTab
            to="https://coop.co.uk/terms/food-voucher-offer"
            text="Promotion terms and conditions"
          />
        </p>
      </div>
    </div>
  );
};

VoucherCode.propTypes = {
  isFetching: PropTypes.bool
};

VoucherCode.defaultProps = {
  isFetching: false
};

export default VoucherCode;
