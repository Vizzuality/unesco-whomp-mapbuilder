import React, { FunctionComponent, useRef, useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { mapController } from '../../../../js/controllers/mapController';
import { RootState } from '../../../../js/store/index';
import { searchContent } from '../../../../../configs/translations/modal.tanslations';

const SearchContent: FunctionComponent = () => {
  const searchRef = useRef(null);
  const [formError, setFormError] = useState(false);
  const [latitudeInput, setLatitude] = useState('');
  const [longitudeInput, setLongitude] = useState('');
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);
  const selectedSearchWidgetLayer = useSelector((state: RootState) => state.appState.selectedSearchWidgetLayer);

  const { title, buttonTitle, latitude, longitude, coordinatesTitle } = searchContent[selectedLanguage];

  useEffect(() => {
    mapController.initializeSearchWidget(searchRef);
  }, []);

  const setSearch = (): void => {
    if (latitudeInput === '' || latitudeInput === '') {
      setFormError(true);
    } else if (Number(latitudeInput) > 90 || Number(latitudeInput) < -90) {
      setFormError(true);
    } else if (Number(longitudeInput) > 180 || Number(longitudeInput) < -180) {
      setFormError(true);
    } else {
      setFormError(false);
      mapController.setSearchWidget(latitudeInput, longitudeInput);
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <h2 className="font-bold">{coordinatesTitle}</h2>
        {formError && (
          <div className="text-xs text-red-400">Latitudes range from -90 to 90. Longitudes range from -180 to 180.</div>
        )}
        <div className="flex justify-between items-center">
          <label className="w-20" htmlFor={latitude}>
            {latitude}:
          </label>
          <input
            value={latitudeInput}
            id={latitude}
            type="number"
            min={-90}
            max={90}
            className="grow form-input"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setLatitude(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="w-20" htmlFor={longitude}>
            {longitude}:
          </label>
          <input
            value={longitudeInput}
            id={longitude}
            type="number"
            min={-180}
            max={180}
            className="grow form-input"
            onChange={(e: ChangeEvent<HTMLInputElement>): void => setLongitude(e.target.value)}
          />
        </div>

        <button className="btn" type="button" onClick={setSearch}>
          {buttonTitle}
        </button>
      </div>

      <hr className="w-1/2 border-t-gray-dark" />

      <div className="space-y-4">
        <h2 className="font-bold">{title}</h2>
        <div ref={searchRef} className="border border-gray-dark rounded"></div>
        {selectedSearchWidgetLayer.displayField.length && selectedSearchWidgetLayer.layerTitle.length ? (
          <p>
            Search <em>{selectedSearchWidgetLayer.layerTitle}</em> by {selectedSearchWidgetLayer.displayField}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default SearchContent;
