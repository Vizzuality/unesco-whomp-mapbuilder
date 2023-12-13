import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { RootState } from '../../../js/store';
import { LayerProps } from '../../../js/store/mapview/types';
import LegendItems from './generateLegendItems';
import { layerIsInScale } from '../../../js/helpers/layerScaleCheck';

import { layersPanelTranslations } from '../../../../configs/translations/leftPanel.translations';

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
  };
};

const Legend = (): JSX.Element => {
  const hideFooter = useSelector((store: RootState) => store.appSettings.hideFooter);
  const hideLegend = useSelector((store: RootState) => store.appSettings.hideLegend);
  const hideWidgetActive = useSelector((store: RootState) => store.appState.hideWidgetActive);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const gladConfirmed = useSelector((store: RootState) => store.appState.leftPanel.gladConfirmed);
  const allAvailableLayers = useSelector((store: RootState) => store.mapviewState.allAvailableLayers);

  const scale = useSelector((store: RootState) => store.mapviewState.scale);

  const layersLoading = useSelector((store: RootState) => store.mapviewState.layersLoading);

  const [legendOpen, setLegendOpen] = useState(!hideLegend);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  function handleLegendToggle(): void {
    setLegendOpen(!legendOpen);
  }

  const [visibleLayersToShow, setVisibleLayersToShow] = useState<LayerProps[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { width } = windowDimensions;

    /**
     * * NOTE:
     * If device is mobile,
     * ensure legendOpen is synced with hideLegend
     */

    if (width < 475 && hideLegend) {
      setLegendOpen(hideLegend);
    }
  }, [windowDimensions.width, hideLegend]);

  useEffect(() => {
    //TODO: order should be applied here
    //IDS of layers you want to specifically ignore in the legend
    const ignoredLayers = ['RECENT_IMAGERY'];
    const visibleLayers = allAvailableLayers
      .filter((l) => l.visible)
      .filter((l) => !ignoredLayers.includes(l.id))
      .filter((l) => l.group !== 'GROUP_CUSTOM_BASEMAP') // ignore custom basemap
      .filter((l) => layerIsInScale(l, scale));
    //sync layer loading state with legend comp
    setVisibleLayersToShow(visibleLayers);
  }, [layersLoading, allAvailableLayers, scale]);

  const onMobileOrDesktop =
    windowDimensions.width < 475 ? !hideLegend && visibleLayersToShow.length > 0 : visibleLayersToShow.length > 0;

  return (
    <>
      {onMobileOrDesktop && (
        <div
          className={clsx('z-10 absolute bg-white right-6 py-4 px-5 rounded w-full max-w-[282px]', {
            'bottom-16': !hideFooter,
            'bottom-6': hideFooter,
          })}
          data-cy="legend"
        >
          <button
            type="button"
            onClick={handleLegendToggle}
            className="absolute h-8 w-8 top-0 right-[30px] -translate-y-1/2 z-20 flex items-center justify-center rounded-full border border-white bg-primary"
          >
            <ChevronDownIcon
              className={clsx('h-[18px] w-[18px] text-white transition-transform duration-150', {
                'rotate-180': !(legendOpen && !hideWidgetActive),
              })}
            />
          </button>
          <div className={legendOpen && !hideWidgetActive ? 'space-y-4 max-h-[50vh] overflow-y-auto' : 'hidden'}>
            <h2 className="text-xs">{layersPanelTranslations[selectedLanguage].legend || 'Legend'}</h2>
            <LegendItems
              visibleLayers={visibleLayersToShow}
              language={selectedLanguage}
              gladConfirmed={gladConfirmed}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Legend;
