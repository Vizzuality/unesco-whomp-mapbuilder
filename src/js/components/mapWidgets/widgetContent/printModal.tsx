import React, { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { mapController } from '../../../../js/controllers/mapController';
import { printContent } from '../../../../../configs/translations/modal.tanslations';
import { RootState } from '../../../../js/store/index';
import { handleCustomColorTheme } from '../../../../utils';

export const PrintModal: FunctionComponent = () => {
  const [pdfLoading, setPDFLoading] = useState(false);
  const [url, setURL] = useState('');

  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const customColorTheme = useSelector((state: RootState) => state.appSettings.customColorTheme);

  const { buttonLabel, printOptions } = printContent[selectedLanguage];

  const themeColor = handleCustomColorTheme(customColorTheme);

  const printMap = async (printType: string): Promise<void> => {
    setPDFLoading(true);
    setURL('');

    const { url } = await mapController.generateMapPDF(printType);

    if (url) {
      setURL(url);
    } else {
      alert('PDF could not be generated');
    }
    setPDFLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold">{buttonLabel}</h2>
      {printOptions.map((printOption: string, index: number) => {
        return (
          <button
            className="btn"
            style={{ backgroundColor: themeColor }}
            key={index}
            onClick={(): Promise<void> => printMap(printOption)}
          >
            {printOption}
          </button>
        );
      })}
      {pdfLoading ? (
        <div className="flex justify-center">
          <CgSpinner className="next-spinner" />
        </div>
      ) : null}
      {url.length > 0 && (
        <div className="flex justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block flex items-center space-x-1 font-bold text-xs"
          >
            <span>View PDF</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
};
