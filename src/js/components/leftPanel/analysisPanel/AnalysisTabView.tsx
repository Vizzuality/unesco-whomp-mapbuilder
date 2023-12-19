import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

import UploadFile from '../../../../js/components/sharedComponents/UploadFile';
import { mapController } from '../../../../js/controllers/mapController';
import { renderModal, setMultiPolygonSelectionMode } from '../../../../js/store/appState/actions';
import { RootState } from '../../../../js/store';
import BaseAnalysis from '../../../../js/components/leftPanel/analysisPanel/BaseAnalysis';
import { analysisContent } from '../../../../../configs/translations/leftPanel.translations';
import { SelectionIcon } from '../../../../images/selectionIcon';
import { createSelector } from 'reselect';
import MultiPolygonAnalysis from './MultiPolygonAnalysis';
import { handleCustomColorTheme } from '../../../../utils';

//Memo'd selectors
const selectActiveFeaturesLength = createSelector(
  (state: RootState) => state.mapviewState,
  (mapviewState) => mapviewState.activeFeatures.length
);

const selectTabview = createSelector(
  (state: RootState) => state.appState,
  (appState) => appState.leftPanel.tabViewVisible
);

interface TabProps {
  key: string;
  label: string;
}

const AnalysisTabView = (props: TabProps): JSX.Element => {
  const dispatch = useDispatch();
  const activeTab = useSelector((store: RootState) => store.appState.leftPanel.activeTab);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const multiPolygonSelection = useSelector((store: RootState) => store.appState.multiPolygonSelectionMode);

  const {
    analyzeExistingShapeTitle,
    analyzeExistingShapeDirections,
    analyzeYourShapeTitle,
    analyzeYourShapeFirstDirection,
    analyzeYourShapeDirections,
    drawButton,
    enterCoordinatesTitle,
    enterCoordinatesDirections,
    coordinatesButton,
    visitTitle,
    overlappingShapeTitle,
    overlappingShapeDirections,
    overlappingShapeButton,
  } = analysisContent[selectedLanguage];

  const activeFeaturesLength = useSelector(selectActiveFeaturesLength);

  const tabview = useSelector(selectTabview);
  const [multiPolyAnalysisReady, setMultiPolyAnalysisReady] = React.useState(false);
  const tabViewIsVisible = tabview && activeTab === props.label;

  const themeColor = handleCustomColorTheme(customColorTheme);

  const returnFirstInstruction = (type?): JSX.Element => {
    if (analyzeYourShapeFirstDirection[1]) {
      return (
        <>
          {analyzeYourShapeFirstDirection[0]}
          <PencilIcon className={clsx('inline-block', type === 'reduced' ? 'h-4 w-4' : 'h-6 w-6')} />
          {analyzeYourShapeFirstDirection[1]}
        </>
      );
    } else {
      return (
        <>
          {analyzeYourShapeFirstDirection[0]}
          <PencilIcon className="h-4 w-4 inline-block" />
        </>
      );
    }
  };

  const returnVisitTitle = (): JSX.Element => {
    if (visitTitle.length === 2) {
      return (
        <>
          {visitTitle[0]}
          <PencilIcon className="h-4 w-4 inline-block" />
          {visitTitle[1]}
        </>
      );
    } else {
      return (
        <>
          {visitTitle[0]}
          <PencilIcon className="h-4 w-4 inline-block mx-2" />
        </>
      );
    }
  };

  const Buffer = () => {
    return (
      <div className="span-wrapper buffer text-xs">
        <span className="left" style={{ borderTop: `1px solid ${themeColor}` }} /> Or{' '}
        <span className="right" style={{ borderBottom: `1px solid ${themeColor}` }} />
      </div>
    );
  };

  const DefaultAnalysisContent = (): JSX.Element => (
    <div className="analysis-tab-container px-10 py-6 space-y-5">
      <p>{analysisContent[selectedLanguage].description}</p>
      <div className="w-1/2 h-1 border-b border-b-gray-dark" />
      <div className="space-y-4">
        <div className="space-y-4">
          <h3 className="font-bold">{analyzeExistingShapeTitle}</h3>
          <ol className="list-decimal pl-8 text-xs space-y-2">
            {analyzeExistingShapeDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
        </div>

        <Buffer />

        <div className="space-y-4">
          <h3 className="font-bold">{analyzeYourShapeTitle}</h3>
          <ol className="list-decimal pl-8 text-xs space-y-2">
            <li>{returnFirstInstruction()}</li>
            {analyzeYourShapeDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
          <button
            style={{ backgroundColor: themeColor }}
            className="btn"
            onClick={(): void => mapController.createPolygonSketch()}
          >
            <PencilIcon className="h-4 w-4 text-white" />
            <span>{drawButton}</span>
          </button>
        </div>

        <Buffer />

        <div className="space-y-4">
          <h3 className="font-bold">{overlappingShapeTitle}</h3>
          <ol className="list-decimal pl-8 text-xs space-y-2">
            <li>{overlappingShapeDirections[0]}</li>
            <li>{overlappingShapeDirections[1]}</li>
            <li>{overlappingShapeDirections[2]}</li>
            <li>{overlappingShapeDirections[3]}</li>
            <li>{overlappingShapeDirections[4]}</li>
            <li>{overlappingShapeDirections[5]}</li>
          </ol>
          <button className="btn" type="button" onClick={() => dispatch(setMultiPolygonSelectionMode(true))}>
            <SelectionIcon height={18} width={18} fill="white" />
            <span>{overlappingShapeButton}</span>
          </button>
        </div>

        <Buffer />

        <div className="space-y-4">
          <h3 className="font-bold">{enterCoordinatesTitle}</h3>
          <ol className="list-decimal pl-8 text-xs space-y-2">
            {enterCoordinatesDirections.map((direction: string, index: number) => (
              <li key={index}>{direction}</li>
            ))}
          </ol>
          <button
            style={{ backgroundColor: themeColor }}
            className="btn"
            onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}
          >
            <PlusIcon className="h-4 w-4" />
            <span>{coordinatesButton}</span>
          </button>
        </div>

        <Buffer />

        <div className="drop-shapefile-container space-y-2">
          <h3 className="font-bold">{returnVisitTitle()}</h3>
          <UploadFile />
        </div>
      </div>
    </div>
  );

  function initAnalyze(val) {
    setMultiPolyAnalysisReady(val);
  }

  return (
    <>
      {tabViewIsVisible && activeFeaturesLength !== 0 && !multiPolygonSelection && <BaseAnalysis />}
      {tabViewIsVisible && activeFeaturesLength == 0 && !multiPolygonSelection && <DefaultAnalysisContent />}
      {tabViewIsVisible && multiPolygonSelection && <MultiPolygonAnalysis initAnalyze={initAnalyze} />}
      {tabViewIsVisible && multiPolygonSelection && multiPolyAnalysisReady && activeFeaturesLength !== 0 && (
        <BaseAnalysis />
      )}
    </>
  );
};

export default AnalysisTabView;
