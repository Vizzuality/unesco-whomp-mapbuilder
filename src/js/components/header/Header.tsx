import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import LanguageDropdown from '../../../js/components/header/LanguageDropdown';
import ThemeDropdown from '../../../js/components/header/ThemeDropdown';
import GFWLoginDropdown from '../../../js/components/header/GFWLoginDropdown';
import { AboutIcon } from '../../../images/aboutIcon';
import { DownloadIcon } from '../../../images/downloadIcon';
import { RootState } from '../../../js/store/index';
import { headerContent } from '../../../../configs/translations/header.translations';

const appSettingsSelector = createSelector(
  (state: RootState) => state.appSettings,
  (appSettings) => ({
    language: appSettings.language,
    title: appSettings.title,
    subtitle: appSettings.subtitle,
    logoUrl: appSettings.logoUrl,
    logoLinkUrl: appSettings.logoLinkUrl,
    useAlternativeLanguage: appSettings.useAlternativeLanguage,
    alternativeWebmap: appSettings.alternativeWebmap,
    alternativeLanguage: appSettings.alternativeLanguage,
    includeMyGFWLogin: appSettings.includeMyGFWLogin,
    alternativeLanguageTitle: appSettings.alternativeLanguageTitle,
    alternativeLanguageSubtitle: appSettings.alternativeLanguageSubtitle,
    mapThemes: appSettings.mapThemes,
    mapThemeIds: appSettings.mapThemeIds,
    alternativeMapThemes: appSettings.alternativeMapThemes,
  })
);

const Header: FunctionComponent = () => {
  const {
    language,
    title,
    subtitle,
    logoUrl,
    logoLinkUrl,
    useAlternativeLanguage,
    alternativeWebmap,
    alternativeLanguage,
    includeMyGFWLogin,
    alternativeLanguageTitle,
    alternativeLanguageSubtitle,
    mapThemes,
    mapThemeIds,
    alternativeMapThemes,
  } = useSelector(appSettingsSelector);

  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  const isLoggedIn = useSelector((store: RootState) => store.appState.isLoggedIn);

  const navLinksInNewTab = useSelector((store: RootState) => store.appSettings.navLinksInNewTab);

  const downloadLinkUrl = useSelector((store: RootState) => store.appSettings.downloadLinkUrl);

  const aboutLinkUrl = useSelector((store: RootState) => store.appSettings.aboutLinkUrl);

  const target = navLinksInNewTab ? '_blank' : '_self';
  const appTitle = selectedLanguage === language ? title : alternativeLanguageTitle;
  const appSubtitle = selectedLanguage === language ? subtitle : alternativeLanguageSubtitle;

  const mapThemeArray = mapThemes?.split(';');
  const mapThemeIDArray = mapThemeIds?.split(';');
  const alternativeMapThemeArray = alternativeMapThemes?.split(';');
  const renderThemeDropdown = Boolean(mapThemes.length) && mapThemeIDArray.length === mapThemeArray.length;

  return (
    <div className="bg-white h-[72px] px-10 flex items-center justify-between" data-cy="header">
      <div className="flex items-center flex-1 space-x-4">
        {logoUrl && logoLinkUrl && (
          <a href={logoLinkUrl} target={target} rel="noopener noreferrer" tabIndex={0}>
            <img src={logoUrl} alt="Global Forest Watch logo" className="gfw-logo" />
          </a>
        )}
        <div className="flex items-center space-x-4 font-sans">
          <h1 className="font-bold text-primary text-base">{appTitle}</h1>
          <h2>{appSubtitle}</h2>
        </div>
      </div>
      <div className="flex space-x-4">
        {renderThemeDropdown && (
          <ThemeDropdown
            selectedLanguage={selectedLanguage}
            alternativeLanguage={alternativeLanguage}
            mapThemeIds={mapThemeIDArray}
            mapThemes={mapThemeArray}
            alternativeMapThemes={alternativeMapThemeArray}
          />
        )}
        {downloadLinkUrl && downloadLinkUrl.length && (
          <div>
            <a className="header-link" href={aboutLinkUrl} target={target} rel="noopener noreferrer">
              <DownloadIcon width={16} height={16} fill={'#555'} />
              {headerContent[selectedLanguage].download}
            </a>
          </div>
        )}
        {aboutLinkUrl && aboutLinkUrl.length && (
          <div>
            <a className="header-link" href={aboutLinkUrl} target={target} rel="noopener noreferrer">
              <AboutIcon width={16} height={16} fill={'#555'} />
              {headerContent[selectedLanguage].about}
            </a>
          </div>
        )}
        {useAlternativeLanguage && alternativeWebmap && alternativeLanguage && (
          <LanguageDropdown
            language={language}
            alternativeLanguage={alternativeLanguage}
            selectedLanguage={selectedLanguage}
          />
        )}
        {includeMyGFWLogin && <GFWLoginDropdown loggedIn={isLoggedIn} />}
      </div>
    </div>
  );
};

export default Header;
