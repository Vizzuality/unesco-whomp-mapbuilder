import React, { FunctionComponent } from 'react';

import ShareWidget from './shareWidget';
import PrintWidget from './printWidget';
import PenWidget from './penWidget';
import SearchWidget from './searchWidget';
import HideWidget from './hideWidget';
import RefreshWidget from './refreshWidget';
import ZoomWidget from './zoomWidget';
import MeasureWidget from './measureWidget';
// import LegendWidget from './legendWidget';

const MapWidgets: FunctionComponent = () => {
  return (
    <div className="absolute z-10 top-8 right-8 gap-1 flex flex-col">
      <div className="flex flex-wrap gap-1">
        <ZoomWidget />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <ShareWidget />
        <PrintWidget />
        <PenWidget />
        <SearchWidget />
        <HideWidget />
        <RefreshWidget />
        <MeasureWidget />
        {/* <LegendWidget /> */}
      </div>
    </div>
  );
};

export default MapWidgets;
