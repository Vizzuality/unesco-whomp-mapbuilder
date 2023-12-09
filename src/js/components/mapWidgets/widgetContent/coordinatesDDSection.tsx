import React from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';

import { RootState } from '../../../../js/store/index';
import { DDSectionProps } from '../../../../js/types/coordinateForm';
import { coordinatesContent } from '../../../../../configs/translations/modal.tanslations';

export default function DDSection(props: DDSectionProps): JSX.Element {
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);
  const { latitudeLabel, longitudeLabel } = coordinatesContent[selectedLanguage];

  const { ddSection, degreeSymbol, renderRemoveButton, setSection, setDDFormValues } = props;
  const { rowNum, latitude, longitude } = ddSection;

  return (
    <div className="space-y-4">
      {renderRemoveButton && (
        <button onClick={(): void => setSection(false)} className="btn-secondary">
          <span>Remove</span>
          <TrashIcon className="h-4 w-4" />
        </button>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>{latitudeLabel}</label>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="latitude coordinates"
              value={latitude}
              min={-90}
              max={90}
              onChange={(e): void =>
                setDDFormValues({
                  userInput: e.target.value,
                  rowNum,
                  coordinateType: 'latitude',
                })
              }
              className="form-input grow"
            />
            <span>{degreeSymbol}</span>
          </div>
        </div>
        <div>
          <label>{longitudeLabel}</label>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="longitude coordinates"
              value={longitude}
              min={-180}
              max={180}
              onChange={(e): void =>
                setDDFormValues({
                  userInput: e.target.value,
                  rowNum,
                  coordinateType: 'longitude',
                })
              }
              className="form-input grow"
            />
            <span>{degreeSymbol}</span>
          </div>
        </div>
      </div>
      <hr className="w-1/2 border-t-gray-dark" />
    </div>
  );
}
