import * as React from 'react';

import { LayerProps } from '../../store/mapview/types';
import { GradientItem } from './LegendLabelComponents';
import { mapController } from '../../controllers/mapController';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LegendLabel from './LegendLabel';
import legendInfoController from '../../helpers/legendInfo';
import ManualLegend from './ManualLegend';
import WMSImageWithPlaceholder from './generateWMSLegendGraphic';

interface LegendItemProps {
  visibleLayers: LayerProps[];
  language: string;
  gladConfirmed: boolean;
}

function generateGradientItem(legendConfig: any, language: string): JSX.Element {
  return (
    <div className="label-item">
      <GradientItem items={legendConfig.items} language={language} />
    </div>
  );
}

function checkForRenderer(layer: LayerProps): boolean {
  const esriLayer = mapController._map?.findLayerById(layer.id) as any;
  if (esriLayer) {
    return esriLayer.renderer;
  }
  return false;
}

function generateWMSLegendInfo(layer: LayerProps, i: number): JSX.Element {
  return (
    <div className="layer-item space-y-1" key={layer.id + `${i}`}>
      <h3 className="text-xs font-bold">{layer.title}</h3>
      {layer.legendInfo.layerName && <div className="title">{layer.legendInfo.layerName}</div>}
      <WMSImageWithPlaceholder alt={'wms-legend'} src={layer.legendInfo} errorMessage={'Legend graphic not found'} />
    </div>
  );
}

const LegendItems = (props: LegendItemProps): JSX.Element => {
  const { language } = props;
  const integratedAlertLabel = useSelector((store: RootState) => store.appState.leftPanel.gfwLayerLabel);

  const items = props.visibleLayers.map((layer, i) => {
    //@TODO this needs some refactoring to make it more readable!!
    if (!layer.legendInfo) {
      return <ManualLegend layer={layer} language={language} i={i} />;
    } else if (layer.legendInfo && layer.origin === 'service') {
      if (layer.type === 'wms') {
        return generateWMSLegendInfo(layer, i);
      } else {
        const labelIcons = layer.legendInfo.map((item: any, i: number) => {
          item.label = item.label && item.label.length ? item.label : layer.title;
          const subLabels = item.legend.map((subitem: any, i: number) => {
            return (
              <div key={i} className="sublayer-item-feature">
                <div>
                  <LegendLabel type={'webmap'} options={subitem} opacity={layer.opacity.combined} />
                </div>
                <span>{subitem.label}</span>
              </div>
            );
          });
          return (
            <div className="label-item-feature space-y-1" key={i}>
              {layer.type === 'tiled' && <div className="title">{item.name}</div>}
              {subLabels}
            </div>
          );
        });
        return (
          <div className="layer-item space-y-1" key={layer.id + `${i}`}>
            <h3 className="text-xs font-bold">{layer.title}</h3>
            {labelIcons}
          </div>
        );
      }
    } else if (layer.legendInfo && layer.origin === 'webmap') {
      if (layer.type === 'wms') {
        return generateWMSLegendInfo(layer, i);
      } else {
        const labelIcons = layer.legendInfo?.map((item: any, i: number) => {
          item.label = item.label && item.label.length ? item.label : layer.title;
          const rendererExists = checkForRenderer(layer);
          return (
            <div className="flex items-center space-x-2" key={i}>
              {!rendererExists ? (
                <LegendLabel type={layer.type} options={item} opacity={layer.opacity.combined} />
              ) : (
                legendInfoController.getLegendInfoFromRenderer(layer)
              )}
              <div>{item.label}</div>
            </div>
          );
        });
        return (
          <div className="layer-item space-y-1" key={layer.id + `${i}`}>
            <h3 className="text-xs font-bold">{layer.title}</h3>
            {layer.legendInfo.layerName && <div className="title">{layer.legendInfo.layerName}</div>}
            {labelIcons}
          </div>
        );
      }
    } else if (layer.legendInfo && layer.origin === 'remote') {
      let labelIcons;
      if (layer.metadata?.legendConfig?.type === 'gradient') {
        //Gradient requires combining items into a single image, so we deal with it separately
        labelIcons = generateGradientItem(layer.metadata?.legendConfig, language);
      } else if (layer.metadata?.legendConfig?.type === 'group') {
        labelIcons = layer.metadata?.legendConfig?.items.map((item: any, i: number) => {
          let subgroupItems;
          if (item.subgroup.type === 'gradient') {
            subgroupItems = <div>{generateGradientItem(item.subgroup, language)}</div>;
          } else {
            subgroupItems = item.subgroup.items.map((subItem: any, i: number) => {
              return (
                <div key={i} className="subgroup-item">
                  <LegendLabel type={item.subgroup.type} options={subItem} opacity={layer.opacity.combined} />
                  <p>{subItem.name[language]}</p>
                </div>
              );
            });
          }
          return (
            <div className="label-item subgroup" key={i}>
              <p>{item.name[language]}</p>
              <div>{subgroupItems}</div>
            </div>
          );
        });
      } else {
        labelIcons = layer.metadata?.legendConfig?.items.map((item: any, i: number) => {
          return (
            <div className="label-item flex items-center space-x-2" key={i}>
              <LegendLabel type={layer.metadata?.legendConfig?.type} options={item} opacity={layer.opacity.combined} />
              <div>{item.name[language]}</div>
            </div>
          );
        });
      }

      return (
        <div className="space-y-2" key={layer.id + `${i}`}>
          <h3 className="text-xs font-bold">
            {layer.title === 'Integrated Deforestation Alerts' ? integratedAlertLabel : layer.title}
          </h3>
          {labelIcons}
        </div>
      );
    }
  });
  return <div className="space-y-4 text-xs">{items}</div>;
};

export default LegendItems;
