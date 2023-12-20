import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { mapController } from '../../controllers/mapController';

import { MAP_ZOOM_BUTTON_STYLE } from './constants';
import { RootState } from '../../../js/store/index';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const ZoomWidget: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlt, setIsOpenAlt] = useState(false);
  const { selectedLanguage } = useSelector((state: RootState) => state.appState);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: 'left',
    middleware: [offset(5)],
    onOpenChange: setIsOpen,
  });

  const {
    refs: refsAlt,
    floatingStyles: floatingStylesAlt,
    context: contextAlt,
  } = useFloating({
    open: isOpen,
    middleware: [offset(5)],
    onOpenChange: setIsOpenAlt,
  });

  const hover = useHover(context);
  const hoverAlt = useHover(contextAlt);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const { getReferenceProps: getReferencePropsAlt, getFloatingProps: getFloatingPropsAlt } = useInteractions([
    hoverAlt,
  ]);

  return (
    <>
      <button
        className="flex items-center justify-center h-8 w-8 rounded bg-primary text-white transition-colors hover:bg-gray-dark"
        aria-label="zoom out"
        aria-pressed={undefined}
        onClick={() => mapController.zoomInOrOut({ zoomIn: false })}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <MinusIcon className="h-5 w-5" />
      </button>
      <button
        className={MAP_ZOOM_BUTTON_STYLE}
        aria-label="zoom in"
        aria-pressed={undefined}
        onClick={() => mapController.zoomInOrOut({ zoomIn: true })}
        ref={refsAlt.setReference}
        {...getReferencePropsAlt()}
      >
        <PlusIcon className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[selectedLanguage].zoomOut}
        </div>
      )}

      {isOpenAlt && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refsAlt.setFloating}
          style={floatingStylesAlt}
          {...getFloatingPropsAlt()}
        >
          {mapControlsTranslations[selectedLanguage].zoomIn}
        </div>
      )}
    </>
  );
};

export default ZoomWidget;
