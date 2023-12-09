import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/solid';

import UploadFile from '../../../../js/components/sharedComponents/UploadFile';
import { renderModal } from '../../../../js/store/appState/actions';
import { mapController } from '../../../../js/controllers/mapController';
import { penContent } from '../../../../../configs/translations/modal.tanslations';
import { PolygonIcon } from '../../../../images/PolygonIcon';

import { handleCustomColorTheme } from '../../../../utils';

const PenContent: FunctionComponent = () => {
  const dispatch = useDispatch();

  const selectedLanguage = useSelector((state: any) => state.appState.selectedLanguage);
  const customColorTheme = useSelector((state: any) => state.appSettings.customColorTheme);
  const { drawTitle, drawInstructions, drawButton, coordinatesTitle, coordinatesInstructions, coordinatesButton } =
    penContent[selectedLanguage];

  const themeColor = handleCustomColorTheme(customColorTheme);

  const setDrawTool = () => {
    dispatch(renderModal(''));
    mapController.createPolygonSketch();
  };

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <h2 className="font-bold">{drawTitle}</h2>
        <ol className="list-decimal pl-8 text-xs space-y-2">
          {drawInstructions.map((direction: string, i: number) => (
            <li key={i}>{direction}</li>
          ))}
        </ol>
        <div className="pl-8">
          <PolygonIcon customColorTheme={themeColor} height={75} width={100} />
        </div>
        <button className="btn" style={{ backgroundColor: themeColor }} onClick={() => setDrawTool()}>
          <PencilIcon className="h-4 w-4" />
          <span>{drawButton}</span>
        </button>
      </div>

      <hr className="w-1/2 border-t-gray-dark" />

      <div className="space-y-4">
        <h2 className="font-bold">{coordinatesTitle}</h2>
        <ol className="list-decimal pl-8 text-xs space-y-2">
          {coordinatesInstructions.map((direction: string, i: number) => (
            <li key={i}>{direction}</li>
          ))}
        </ol>
        <button className="btn" onClick={() => dispatch(renderModal('PenWidget-CoordinatesForm'))}>
          <PlusIcon className="h-4 w-4" />
          <span>{coordinatesButton}</span>
        </button>
      </div>

      <hr className="w-1/2 border-t-gray-dark" />

      <div className="space-y-4">
        <UploadFile />
      </div>
    </div>
  );
};

export default PenContent;
