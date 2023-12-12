import * as React from 'react';
import legendInfoController from '../../helpers/legendInfo';

interface ManualLegendProps {
  layer: any;
  language: string;
  i: number;
}

const ManualLegend = (props: ManualLegendProps) => {
  const { layer, language, i } = props;
  const legendInfo = legendInfoController.getLegendInfoFromRenderer(layer);
  let versionedLabel = '';
  if (layer.versions) {
    const idx = layer?.versionIndex || 0;
    versionedLabel = layer.versions[idx].label[language];
  }
  const label = (
    <div className="label-item-feature space-y-1">
      {legendInfo}
      {versionedLabel !== '' && versionedLabel}
    </div>
  );
  return (
    <div className="layer-item space-y-1" key={`${layer.id}-manual-legend-item-${i}`}>
      <h3 className="text-xs font-bold">{layer.title}</h3>
      {label}
    </div>
  );
};

export default ManualLegend;
