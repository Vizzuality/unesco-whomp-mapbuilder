import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { MAP_WIDGET_BUTTON_STYLE } from './constants';
import { RootState } from '../../../js/store/index';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const RefreshWidget: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useSelector((state: RootState) => state.appState);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    middleware: [offset(5)],
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <button
        className={MAP_WIDGET_BUTTON_STYLE}
        aria-label="refresh widget"
        onClick={() => window.location.reload()}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <ArrowPathIcon className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[selectedLanguage].reload}
        </div>
      )}
    </>
  );
};

export default RefreshWidget;
