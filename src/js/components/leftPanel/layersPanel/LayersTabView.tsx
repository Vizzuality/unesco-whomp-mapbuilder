import * as React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../js/store';
import WebmapLayersGroup from './WebmapLayersGroup';
import BasemapLayersGroup from './BasemapLayersGroup';
import DefaultLayerGroup from './DefaultLayerGroup';
import ImageryLayersGroup from './ImageryLayersGroup';
import { layersPanelTranslations } from '../../../../../configs/translations/leftPanel.translations';

import '../../../../css/leftpanel.scss';

interface LayerControlProps {
  selectedLanguage: string;
}

interface LayersTabViewProps {
  key: string;
  label: string;
}
const LayersTabView = (props: LayersTabViewProps) => {
  const activeTab = useSelector((store: RootState) => store.appState.leftPanel.activeTab);
  const tabViewVisible = useSelector((store: RootState) => store.appState.leftPanel.tabViewVisible);
  const hideWidgetActive = useSelector((store: RootState) => store.appState.hideWidgetActive);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const recentImagery = useSelector((store: RootState) => store.appSettings.recentImagery);

  const layerPanel = useSelector((store: RootState) => store.appSettings.layerPanel);
  const tabViewIsVisible = tabViewVisible && activeTab === props.label;
  const layerGroupsToRender = Object.keys(layerPanel)
    .sort((a: string, b: string) => layerPanel[a].order - layerPanel[b].order)
    .map((layerGroupKey: string) => {
      switch (layerGroupKey) {
        case 'GROUP_WEBMAP':
          return (
            <WebmapLayersGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
        case 'GROUP_BASEMAP':
          return (
            <BasemapLayersGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
        case 'GROUP_IMAGERY':
          if (recentImagery !== undefined && !recentImagery) return null;
          return (
            <ImageryLayersGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
        case 'extraLayers':
          return null;
        default:
          return (
            <DefaultLayerGroup
              key={layerGroupKey}
              layerGroupKey={layerGroupKey}
              layerGroupConfig={layerPanel[layerGroupKey]}
            />
          );
      }
    });
  return (
    <>
      {tabViewIsVisible && (
        <div className="px-10 py-6">
          <div className="space-y-5">
            <p>{layersPanelTranslations[selectedLanguage].description}</p>
            <div className="w-1/2 h-1 border-b border-b-gray-dark" />
            <div
              className={clsx({
                hidden: hideWidgetActive,
              })}
            >
              <div>{layerGroupsToRender}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayersTabView;
