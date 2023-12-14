import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../js/store/index';
import { shareContent } from '../../../../../configs/translations/modal.tanslations';
import { analysisReportConfig } from '../../../../../configs/translations/report.translations';
import { getShareableURL } from '../../../../js/helpers/shareFunctionality';

const ShareContent: FunctionComponent = () => {
  const urlRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const selectedLanguage = useSelector((state: RootState) => state.appState.selectedLanguage);

  const [urlValue, setUrlValue] = useState<any>('');
  const { title } = shareContent[selectedLanguage];
  const { shareModalTitle, copyButtonInShareModal } = analysisReportConfig;

  const copyURLToClipboard = (): void => {
    urlRef.current.select();
    document.execCommand('copy');
    // ? do we need a bitly account (like in master branch) to shortern URLs ?
    // TODO which accounts for long mapbuilder URLs
  };

  useEffect((): any => {
    async function returnURL(): Promise<void> {
      //Let's check if we are in the report mode or not
      const reportParam = new URL(window.location.href).searchParams.get('report');
      let reportView;
      if (reportParam) {
        reportView = reportParam === 'true';
      } else {
        reportView = false;
      }

      const appID = new URL(window.location.href).searchParams.get('appid');

      const baseUrl = new URL(window.location.href);

      if (reportView) {
        //If we are in Report VIEW, we already have a share URL, no need to do anything
        setUrlValue(baseUrl);
      } else {
        //Construct share URL based on parameters. For REPORT view, we need to register geometry and
        //get back geostoreID to add to the URL, for NORMAL views we do not share the active feature
        //so that is not done currently.
        const stateUrl = await getShareableURL({ report: reportView });
        let combinedReportURL = baseUrl.origin + baseUrl.pathname;
        combinedReportURL = appID
          ? combinedReportURL + '?' + 'appid=' + appID + '&' + stateUrl
          : combinedReportURL + '?' + stateUrl;
        setUrlValue(combinedReportURL);
      }
    }
    returnURL();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="font-bold">{title}</h2>
      <p className="text-xs">{shareModalTitle[selectedLanguage]}</p>
      <div className="flex items-center justify-between space-x-2">
        <input type="text" readOnly value={urlValue} ref={urlRef} className="form-input grow" />
        <button className="btn" onClick={(): void => copyURLToClipboard()}>
          {copyButtonInShareModal[selectedLanguage]}
        </button>
      </div>
    </div>
  );
};

export default ShareContent;
