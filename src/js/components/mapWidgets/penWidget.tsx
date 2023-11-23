import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { PencilIcon } from '@heroicons/react/24/solid';

import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const PenWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={MAP_WIDGET_BUTTON_STYLE}
      aria-label="pen widget"
      onClick={() => dispatch(renderModal('PenWidget'))}
    >
      <PencilIcon className="w-5 h-5" />
    </button>
  );
};

export default PenWidget;
