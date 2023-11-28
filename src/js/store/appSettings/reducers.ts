import { AppSettings, AppSettingsTypes, OVERWRITE_SETTINGS, OVERWRITE_COLOR_THEME, SET_HIDE_LEGEND } from './types';

const initialState: AppSettings = {
  webmap: '512eef95997b4e7486cdbdc45078739d',
  title: 'World Heritage Online Maps Platform',
  subtitle: '',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://developers.globalforestwatch.org/map-builder/',
  useAlternativeLanguage: false,
  analyticsCode: '',
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  includeMyGFWLogin: true,
  hideFooter: false,
  hideHeader: false,
  hideLegend: false,
  navLinksInNewTab: true,
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  sharinghost: 'https://www.arcgis.com/',
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  language: 'en',
  iso: '',
  layerPanel: {
    GROUP_WORLD_HERITAGE: {},
    GROUP_NEAR_REAL_TIME: {},
    GROUP_PROTECTION_AND_MANAGEMENT: {},
    GROUP_NATURAL_VALUES: {},
    GROUP_SOCIOECONOMIC: {},
    GROUP_THREATS_AND_RISKS: {},
    GROUP_CLIMATE: {},
    GROUP_WEBMAP: {},
    GROUP_BASEMAP: {},
    // GROUP_LC: {}, // old
    // GROUP_LCD: {}, // old
    GROUP_IMAGERY: {},
    extraLayers: {},
  },
  narrative: '',
  alternativeNarrative: '',
  alternativeLanguageTitle: '',
  alternativeLanguageSubtitle: '',
  mapThemeIds: '',
  mapThemes: '',
  alternativeMapThemes: '',
  customColorTheme: '#f0ab00', // #f0ab00 - is the default, it will be overwritten if configed
  footerLinks: [],
  disabledAnalysisModules: [],
  treeMosaicLandscapes: false,
  webmapLayerGroupsMap: {},
};

export function appSettingsReducer(state = initialState, action: AppSettingsTypes): AppSettings {
  switch (action.type) {
    case OVERWRITE_SETTINGS:
      return { ...state, ...action.payload };
    case OVERWRITE_COLOR_THEME:
      return { ...state, customColorTheme: action.payload };
    case SET_HIDE_LEGEND:
      return { ...state, hideLegend: action.payload };
    default:
      return state;
  }
}
