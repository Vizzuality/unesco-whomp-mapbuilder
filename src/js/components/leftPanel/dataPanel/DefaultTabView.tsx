import * as React from 'react';
import { ReactComponent as AnalysisIcon } from 'images/analysisPolyIcon.svg';

const DefaultTabView = (): JSX.Element => (
  <div className="data-tab-default-container">
    <p>Select a shape on the map</p>
    <ol>
      <li>Use the layers tab to turn on a data layer</li>
      <li>Select a shape on the map</li>
    </ol>
    <AnalysisIcon width={100} height={100} />
  </div>
);

export default DefaultTabView;
