import React, { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';

import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';
import { RootState } from '../../../js/store/index';
import { mapControlsTranslations } from '../../../../configs/translations/map.translations';

const SearchWidget: FunctionComponent = () => {
  const dispatch = useDispatch();
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
      <div className="widget-container">
        <button
          className={MAP_WIDGET_BUTTON_STYLE}
          aria-label="search widget"
          onClick={() => dispatch(renderModal('SearchWidget'))}
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
      {isOpen && (
        <div
          className="bg-gray-dark text-white text-xs p-2 rounded-md"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {mapControlsTranslations[selectedLanguage].search}
        </div>
      )}
    </>
  );
};

export default SearchWidget;
