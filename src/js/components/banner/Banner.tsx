import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from '@headlessui/react';
import { BellSnoozeIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { bannerContent } from '../../../../configs/translations/header.translations';
import { RootState } from '../../store';

const Banner = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  const handleClick = useCallback(() => setIsHidden(!isHidden), [isHidden]);

  return (
    <Transition
      show={!isHidden}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex px-10 py-2.5 bg-warn space-x-4">
        <BellSnoozeIcon className="h-4 w-4 text-gray-dark" />
        <div className="grow font-sans text-gray-dark text-xs">
          {bannerContent[selectedLanguage].text}{' '}
          <a
            href={'http://mapbuilder.wri.org/tutorials/tml-to-tcc'}
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            {bannerContent[selectedLanguage].linkUrlText}
          </a>
        </div>
        <button
          className="flex items-center justify-center rounded-full h-4 w-4 bg-white border border-gray-dark overflow-hidden"
          onClick={handleClick}
        >
          <XMarkIcon className="h-4 w-4 text-gray-dark bg-white" />
        </button>
      </div>
    </Transition>
  );
};

export default Banner;
