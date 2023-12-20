import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRuler } from 'react-icons/fa6';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { RootState } from '../../../js/store/index';
import { renderModal } from '../../../js/store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const MeasureWidget: FunctionComponent = () => {
  const modalType = useSelector((state: RootState) => state.appState.renderModal);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useSelector((state: RootState) => state.appState);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: 'left',
    middleware: [offset(5)],
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const handleWidget = (): void => {
    if (modalType === 'MeasureWidget') {
      dispatch(renderModal(''));
    } else {
      dispatch(renderModal('MeasureWidget'));
    }
  };

  return (
    <>
      <button
        className={MAP_WIDGET_BUTTON_STYLE}
        aria-label="measure widget"
        onClick={handleWidget}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <FaRuler className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[selectedLanguage].measurement}
        </div>
      )}
    </>
  );
};

export default MeasureWidget;
