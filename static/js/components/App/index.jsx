import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { notInServiceArea as notInServiceAreaSelector } from '../../store/addresses/selectors';
import ModalManager from '../ModalManager';
import NotInServiceArea from '../MultiStore/NotInServiceArea';
import StickyNotices from '../StickyNotices';
import Routes from './Routes';
import ScrollRestoration from './ScrollRestoration';

/* eslint-disable react/prop-types */
const App = ({ router: Router = BrowserRouter, history }) => {
  const notInServiceArea = useSelector(notInServiceAreaSelector);

  return (
    <Router history={history}>
      <ScrollRestoration>
        {notInServiceArea ? <NotInServiceArea /> : <Routes />}
        <StickyNotices />
        <ModalManager />
      </ScrollRestoration>
    </Router>
  );
};

export default App;
