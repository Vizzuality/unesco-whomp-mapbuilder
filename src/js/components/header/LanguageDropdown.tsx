import React from 'react';
import clsx from 'clsx';
import { Listbox } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

import { mapController } from '../../../js/controllers/mapController';
import { headerContent } from '../../../../configs/translations/header.translations';

interface DropProps {
  language: string;
  alternativeLanguage: string;
  selectedLanguage: string;
}

function valueToLang(abbrev: string): string {
  let lang = '';

  switch (abbrev) {
    case 'en':
      lang = 'English';
      break;
    case 'nl':
      lang = 'Dutch';
      break;
    case 'hy':
      lang = 'Armenian';
      break;
    case 'es':
      lang = 'Spanish';
      break;
    case 'fr':
      lang = 'French';
      break;
    case 'pt':
      lang = 'Portuguese';
      break;
    case 'id':
      lang = 'Indonesian';
      break;
    case 'ka':
      lang = 'Georgian';
      break;
    case 'zh':
      lang = 'Chinese';
      break;
    case 'az':
      lang = 'Azeri';
      break;
    default:
      break;
  }

  return lang;
}

const LanguageDropdown = (props: DropProps) => {
  const labels = [props.language, props.alternativeLanguage];

  return (
    <Listbox as="div" className="relative">
      <Listbox.Button className="flex items-center space-x-2">
        <GlobeAltIcon className="h-4 w-4" />
        <span>{headerContent[props.selectedLanguage].language}</span>
      </Listbox.Button>
      <Listbox.Options className="absolute left-0 bottom-full z-10 mb-2 origin-bottom-left bg-white rounded shadow-sm ring-1 ring-gray-light">
        <Listbox.Option
          className={clsx('px-4 py-2 cursor-pointer hover:bg-primary hover:text-white', {
            'bg-primary text-white': props.selectedLanguage === props.language,
          })}
          value={props.language}
          onClick={() => mapController.changeLanguage(props.language)}
          data-lang={labels[0]}
        >
          {valueToLang(props.language)}
        </Listbox.Option>
        <Listbox.Option
          className={clsx('px-4 py-2 cursor-pointer hover:bg-primary hover:text-white', {
            'bg-primary text-white': props.selectedLanguage === props.alternativeLanguage,
          })}
          value={props.alternativeLanguage}
          onClick={() => mapController.changeLanguage(props.alternativeLanguage)}
          data-lang={labels[1]}
        >
          {valueToLang(props.alternativeLanguage)}
        </Listbox.Option>
      </Listbox.Options>
    </Listbox>
  );
};

export default LanguageDropdown;
