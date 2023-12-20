import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EyeIcon } from '@heroicons/react/24/solid';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { setHideWidget } from '../../../js/store/appState/actions';
import { RootState } from '../../../js/store/index';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const HideWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { hideWidgetActive } = useSelector((state: RootState) => state.appState);
  const { language } = useSelector((state: RootState) => state.appSettings);

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: 'left',
    middleware: [offset(5)],
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const toggleContent = (): void => {
    dispatch(setHideWidget(!hideWidgetActive));
  };

  return (
    <>
      <button
        className={MAP_WIDGET_BUTTON_STYLE}
        aria-label="hide left panel and legend"
        onClick={toggleContent}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <EyeIcon className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[language].toggle}
        </div>
      )}
    </>
  );
};

export default HideWidget;
