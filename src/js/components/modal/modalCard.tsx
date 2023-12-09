import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { PrintModal } from '../mapWidgets/widgetContent/printModal';
import ShareContent from '../../../js/components/mapWidgets/widgetContent/shareContent';
import PenContent from '../../../js/components/mapWidgets/widgetContent/penContent';
import SearchContent from '../../../js/components/mapWidgets/widgetContent/searchContent';
import CoordinatesForm from '../../../js/components/mapWidgets/widgetContent/coordinatesForm';
import MeasureContent from '../../../js/components/mapWidgets/widgetContent/measureContent';
import CanopyDensityContent from '../../../js/components/mapWidgets/widgetContent/CanopyDensityContent';
import SubscriptionContent from '../../../js/components/dataPanel/subscribeToAlerts/SubscriptionContent';
import SaveAOI from '../leftPanel/dataPanel/subscribeToAlerts/SaveAOI';
import InfoContent from '../../../js/components/sharedComponents/InfoContent';
import LayerDash from '../../../js/components/sharedComponents/LayerDash';
import EditProfile from '../../../js/components/gfwContent/EditProfile';
import PlanetInfo from '../../../js/components/leftPanel/layersPanel/PlanetInfo';

import { renderModal } from '../../store/appState/actions';

import { RootState } from '../../store';

import '../../../css/modalCard.scss';
import TreeMosaicContent from '../mapWidgets/widgetContent/TreeMosaicContent';
import ForestGrossRemovalContent from '../mapWidgets/widgetContent/ForestGrossRemovalContent';
import ForestGrossCarbonEmissionContent from '../mapWidgets/widgetContent/ForestCarbonGrossEmissionContent';
import ForestCarbonNetFluxContent from '../mapWidgets/widgetContent/ForesCarbonNetFlux';

const ModalCard: FunctionComponent<{}> = () => {
  const modalType = useSelector((state: RootState) => state.appState.renderModal);
  const dispatch = useDispatch();

  const handleEscapeKey = (key: string) => {
    if (key === 'Escape') {
      dispatch(renderModal(''));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      handleEscapeKey(e.key);
    });
    return () => {
      window.removeEventListener('keydown', (_) => handleEscapeKey('Escape'));
    };
  }, []);

  const returnContent = () => {
    switch (modalType) {
      case 'PrintWidget':
        return <PrintModal />;
      case 'ShareWidget':
        return <ShareContent />;
      case 'PenWidget':
        return <PenContent />;
      case 'PenWidget-CoordinatesForm':
        return <CoordinatesForm />;
      case 'AOIDashboard':
        return <SubscriptionContent />;
      case 'SaveAOI':
        return <SaveAOI />;
      case 'SearchWidget':
        return <SearchContent />;
      case 'MeasureWidget':
        return <MeasureContent />;
      case 'CanopyDensity':
        return <CanopyDensityContent />;
      case 'treeMosaic':
        return <TreeMosaicContent />;
      case 'forestCarbonRemoval':
        return <ForestGrossRemovalContent />;
      case 'forestCarbonGrossEmissions':
        return <ForestGrossCarbonEmissionContent />;
      case 'forestCarbonNetFlux':
        return <ForestCarbonNetFluxContent />;
      case 'InfoContent':
        return <InfoContent />;
      case 'EditProfile':
        return <EditProfile />;
      case 'PlanetInfo':
        return <PlanetInfo />;
      case 'LayerDash':
        return <LayerDash />;
      default:
        break;
    }
  };

  const setClassName = (): string => {
    switch (modalType) {
      case 'MeasureWidget':
        return 'measure-widget';
      case 'GFWLoginWidget':
        return 'gfw-login-widget';
      case 'PenWidget':
        return 'pen-widget';
      case 'PenWidget-CoordinatesForm':
        return 'pen-widget-coordform';
      case 'SearchWidget':
        return 'search-widget';
      case 'PrintWidget':
        return 'print-widget';
      case 'ShareWidget':
        return 'share-widget';
      case 'InfoContent':
        return 'info-content';
      case 'AOIDashboard':
        return 'subscription-widget';
      case 'SaveAOI':
        return 'saveAOI';
      case 'EditProfile':
        return 'edit-profile';
      case 'PlanetInfo':
        return 'planet-info';
      case 'LayerDash':
        return 'layer-dashboard';
      default:
        return '';
    }
  };

  return (
    <>
      {modalType !== '' ? (
        <>
          <div
            className={clsx('fixed top-0 left-0 w-full h-full bg-black/50 z-40', {
              hidden: setClassName() === 'measure-widget',
            })}
            onClick={() => dispatch(renderModal(''))}
            role="button"
            tabIndex={0}
          />
          <div
            className={clsx(
              'absolute rounded bg-white z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-80vh'
            )}
          >
            <button className="absolute -top-4 -right-4 btn-dialog" onClick={() => dispatch(renderModal(''))}>
              <XMarkIcon className="h-5 w-5 text-white" />
            </button>
            <div className="p-10 overflow-y-auto">{returnContent()}</div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ModalCard;
