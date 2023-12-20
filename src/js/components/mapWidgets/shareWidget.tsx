import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShareIcon } from '@heroicons/react/20/solid';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { RootState } from '../../../js/store/index';
import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const ShareWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useSelector((state: RootState) => state.appSettings);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement: 'left',
    middleware: [offset(5)],
    onOpenChange: setIsOpen,
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <button
        className={MAP_WIDGET_BUTTON_STYLE}
        aria-label="share widget"
        onClick={() => dispatch(renderModal('ShareWidget'))}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <ShareIcon className="h-5 w-5" />
      </button>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[language].share}
        </div>
      )}
    </>
  );
};

export default ShareWidget;
