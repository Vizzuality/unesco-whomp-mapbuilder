import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { ShareIcon } from '@heroicons/react/20/solid';

import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const ShareWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={MAP_WIDGET_BUTTON_STYLE}
      aria-label="share widget"
      onClick={() => dispatch(renderModal('ShareWidget'))}
    >
      <ShareIcon className="h-5 w-5" />
    </button>
  );
};

export default ShareWidget;
