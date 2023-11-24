import React, { FunctionComponent } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

import { mapController } from '../../controllers/mapController';

import { MAP_ZOOM_BUTTON_STYLE } from './constants';

const ZoomWidget: FunctionComponent = () => {
  return (
    <>
      <button
        className="flex items-center justify-center h-8 w-8 rounded bg-primary text-white transition-colors hover:bg-gray-dark"
        aria-label="zoom out"
        aria-pressed={undefined}
        onClick={() => mapController.zoomInOrOut({ zoomIn: false })}
      >
        <MinusIcon className="h-5 w-5" />
      </button>
      <button
        className={MAP_ZOOM_BUTTON_STYLE}
        aria-label="zoom in"
        aria-pressed={undefined}
        onClick={() => mapController.zoomInOrOut({ zoomIn: true })}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
    </>
  );
};

export default ZoomWidget;
