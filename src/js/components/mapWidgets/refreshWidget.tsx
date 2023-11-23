import React, { FunctionComponent } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const RefreshWidget: FunctionComponent = () => {
  return (
    <button className={MAP_WIDGET_BUTTON_STYLE} aria-label="refresh widget" onClick={() => window.location.reload()}>
      <ArrowPathIcon className="h-5 w-5" />
    </button>
  );
};

export default RefreshWidget;
