import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import LanguageDropdown from '../../js/components/header/LanguageDropdown';
import { RootState } from '../../js/store/index';
import { mapController } from '../../js/controllers/mapController';

const appSettingsSelector = createSelector(
  (state: RootState) => state.appSettings,
  (appSettings) => ({
    language: appSettings.language,
    useAlternativeLanguage: appSettings.useAlternativeLanguage,
    alternativeWebmap: appSettings.alternativeWebmap,
    alternativeLanguage: appSettings.alternativeLanguage,
  })
);

const Footer = (): JSX.Element => {
  const { language, useAlternativeLanguage, alternativeWebmap, alternativeLanguage } = useSelector(appSettingsSelector);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const footerLinks = useSelector((store: RootState) => store.appSettings.footerLinks);
  const attRef = useRef(null);

  useEffect(() => {
    mapController.addMapAttribution(attRef);
  }, []);

  const footerLinksItems = footerLinks.map((item, i: number) => {
    return (
      <div key={i}>
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.label}
        </a>
      </div>
    );
  });

  return (
    <div className="absolute z-30 bg-white/40 left-0 bottom-0 w-full">
      <div className="flex items-center justify-between space-x-4 p-4 text-xs">
        {/* <div className="scaleBar" ref={scaleRef}></div> */}
        <div className="shrink-0">
          {useAlternativeLanguage && alternativeWebmap && alternativeLanguage && (
            <LanguageDropdown
              language={language}
              alternativeLanguage={alternativeLanguage}
              selectedLanguage={selectedLanguage}
            />
          )}
        </div>
        <div className="">{footerLinksItems}</div>
        <div className="overflow-x-auto" ref={attRef}></div>
      </div>
    </div>
  );
};

export default Footer;
