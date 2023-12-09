import * as React from 'react';
import { useSelector } from 'react-redux';
import { PrinterIcon } from '@heroicons/react/24/outline';

import { RootState } from '../../../js/store/index';
import { getShareableURL } from '../../../js/helpers/shareFunctionality';
import '../../../css/printButton.scss';

const printReportTranslations = {
  fr: 'Imprimer le Rapport',
  es: 'Imprimir Informe',
  pt: 'Imprimir Relatóro',
  id: 'Print Report',
  zh: '打印报告',
  en: 'Print Report',
  hy: 'Տպել արդյունքները',
  ka: 'ანგარიშის ბეჭდვა',
  nl: 'Rapport afdrukken',
};

export const PrintReportButton = (): JSX.Element => {
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);

  async function printReportHandler(): Promise<void> {
    const appID = new URL(window.location.href).searchParams.get('appid');
    const baseURL = new URL(window.location.href);
    let combinedReportURL = baseURL.origin + baseURL.pathname;
    const stateUrl = await getShareableURL({ report: true });

    combinedReportURL = appID
      ? combinedReportURL + '?' + 'appid=' + appID + '&' + stateUrl
      : combinedReportURL + '?' + stateUrl;

    window.open(combinedReportURL);
  }

  return (
    <button className="btn-secondary" onClick={printReportHandler}>
      <PrinterIcon className="h-4 w-4" />
      <span>{printReportTranslations[selectedLanguage]}</span>
    </button>
  );
};
