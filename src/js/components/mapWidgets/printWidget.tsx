import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PrinterIcon } from '@heroicons/react/24/solid';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';
import { RootState } from '../../store/index';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const PrintWidget: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useSelector((state: RootState) => state.appState);

  const dispatch = useDispatch();

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
        aria-label="print widget"
        onClick={() => dispatch(renderModal('PrintWidget'))}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <PrinterIcon className="w-5 h-5" />
      </button>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[selectedLanguage].print}
        </div>
      )}
    </>
  );
};

export default PrintWidget;
