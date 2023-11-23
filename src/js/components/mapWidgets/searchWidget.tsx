import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { renderModal } from '../../store/appState/actions';
import { MAP_WIDGET_BUTTON_STYLE } from './constants';

const SearchWidget: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="widget-container">
        <button
          className={MAP_WIDGET_BUTTON_STYLE}
          aria-label="search widget"
          onClick={() => dispatch(renderModal('SearchWidget'))}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </>
  );
};

export default SearchWidget;
