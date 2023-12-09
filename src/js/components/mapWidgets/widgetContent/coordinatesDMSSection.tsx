import React from 'react';
import { useSelector } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/outline';

import { RootState } from '../../../../js/store/index';
import { coordinatesContent } from '../../../../../configs/translations/modal.tanslations';
import { DMSFormValues, CoordinateProps } from '../../../../js/types/coordinateForm';

import '../../../../css/coordinatesForm.scss';

interface DMSSectionProps {
  dmsSection: {
    rowNum: number;
    latitude: CoordinateProps;
    longitude: CoordinateProps;
  };
  setDMSFormValues: (formValues: DMSFormValues) => void;
  setDMSCardinalType: (cardinalValue: object) => void;
  setSection: (addSection: boolean) => void;
  degreeSymbol: string;
  minuteSymbol: string;
  secondsSymbol: string;
  key: number;
  renderRemoveButton: boolean;
}

export default function DMSSection(props: DMSSectionProps): JSX.Element {
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);
  const { latitudeLabel, longitudeLabel } = coordinatesContent[selectedLanguage];
  const {
    dmsSection,
    setDMSFormValues,
    setDMSCardinalType,
    degreeSymbol,
    minuteSymbol,
    secondsSymbol,
    renderRemoveButton,
    setSection,
  } = props;
  const { rowNum, latitude, longitude } = dmsSection;

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <label>{latitudeLabel}</label>
          {renderRemoveButton && (
            <button onClick={(): void => setSection(false)} className="btn-secondary mb-4">
              <TrashIcon className="w-4 h-4" />
              <span>Remove</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.degree}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'degree',
              })
            }
            className="form-input"
          />
          <span className="degree">{degreeSymbol}</span>
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.minutes}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'minutes',
              })
            }
            className="form-input"
          />
          <span className="degree">{minuteSymbol}</span>
          <input
            type="number"
            name="latitude coordinates"
            value={latitude.seconds}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'latitude',
                degreeType: 'seconds',
              })
            }
            className="form-input"
          />
          <span className="degree">{secondsSymbol}</span>
          <select
            value={latitude.cardinalPoint}
            onChange={(e): void =>
              setDMSCardinalType({
                specificPoint: e.target.value,
                rowNum,
                coordinateType: 'latitude',
              })
            }
          >
            <option value="N">N</option>
            <option value="S">S</option>
          </select>
        </div>
      </div>
      <div className="dms-wrapper">
        <label>{longitudeLabel}</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.degree}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'degree',
              })
            }
            className="form-input"
          />
          <span className="degree">{degreeSymbol}</span>
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.minutes}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'minutes',
              })
            }
            className="form-input"
          />
          <span className="degree">{minuteSymbol}</span>
          <input
            type="number"
            name="longitude coordinates"
            value={longitude.seconds}
            onChange={(e): void =>
              setDMSFormValues({
                coordinateValue: e.target.value,
                rowNum,
                coordinateType: 'longitude',
                degreeType: 'seconds',
              })
            }
            className="form-input"
          />
          <span className="degree">{secondsSymbol}</span>
          <select
            value={longitude.cardinalPoint}
            onChange={(e): void =>
              setDMSCardinalType({
                specificPoint: e.target.value,
                rowNum,
                coordinateType: 'longitude',
              })
            }
          >
            <option value="E">E</option>
            <option value="W">W</option>
          </select>
        </div>
      </div>
      <hr className="w-1/2 border-t-gray-dark" />
    </>
  );
}
