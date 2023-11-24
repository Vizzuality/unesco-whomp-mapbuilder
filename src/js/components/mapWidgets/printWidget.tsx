import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { PrinterIcon } from '@heroicons/react/24/solid';

import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const PrintWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={MAP_WIDGET_BUTTON_STYLE}
      aria-label="print widget"
      onClick={() => dispatch(renderModal('PrintWidget'))}
    >
      <PrinterIcon className="w-5 h-5" />
    </button>
  );
};

export default PrintWidget;
