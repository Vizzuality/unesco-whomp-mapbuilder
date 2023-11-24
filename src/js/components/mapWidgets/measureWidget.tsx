import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../js/store/index';
import { renderModal } from '../../../js/store/appState/actions';
import { MeasureIcon } from '../../../images/measureIcon';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const MeasureWidget: FunctionComponent = () => {
  const modalType = useSelector((state: RootState) => state.appState.renderModal);
  const dispatch = useDispatch();

  const handleWidget = (): void => {
    if (modalType === 'MeasureWidget') {
      dispatch(renderModal(''));
    } else {
      dispatch(renderModal('MeasureWidget'));
    }
  };

  return (
    <button className={MAP_WIDGET_BUTTON_STYLE} aria-label="measure widget" onClick={handleWidget}>
      <MeasureIcon className="h-5 w-5" />
    </button>
  );
};

export default MeasureWidget;
