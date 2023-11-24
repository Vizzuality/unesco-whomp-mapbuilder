import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EyeIcon } from '@heroicons/react/24/solid';

import { setHideWidget } from '../../../js/store/appState/actions';
import { RootState } from '../../../js/store/index';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const HideWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { hideWidgetActive } = useSelector((state: RootState) => state.appState);

  const toggleContent = (): void => {
    dispatch(setHideWidget(!hideWidgetActive));
  };

  return (
    <button className={MAP_WIDGET_BUTTON_STYLE} aria-label="hide left panel and legend" onClick={toggleContent}>
      <EyeIcon className="h-5 w-5" />
    </button>
  );
};

export default HideWidget;
