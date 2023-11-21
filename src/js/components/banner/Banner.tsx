import React from 'react';
import './Banner.scss';
import { bannerContent } from '../../../../configs/translations/header.translations';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Banner = () => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  return (
    <div className="banner">
      <div className="banner__text__title">
        {bannerContent[selectedLanguage].text}{' '}
        <a
          href={'http://mapbuilder.wri.org/tutorials/tml-to-tcc'}
          className="banner__text__link"
          target="_blank"
          rel="noreferrer"
        >
          {bannerContent[selectedLanguage].linkUrlText}
        </a>
      </div>
    </div>
  );
};

export default Banner;
