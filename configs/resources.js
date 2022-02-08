export default {
  webmap: 'de85e3fcc07948238aa6c1afd2a4ceb0',
  title: 'GFW Mapbuilder',
  subtitle: 'Make maps that matter',
  logoUrl: 'https://my.gfw-mapbuilder.org/img/gfw-logo.png',
  logoLinkUrl: 'https://www.gfw-mapbuilder.org/',
  aboutLinkUrl: '',
  downloadLinkUrl: '',
  printServiceUrl: 'https://gis.forest-atlas.org/server/rest/services/print/ExportWebMap/GPServer/Export%20Web%20Map',
  maskServiceUrl: '',
  mapThemeIds: '',
  mapThemes: '',
  narrative: '',
  hideHeader: false,
  hideFooter: false,
  includeMyGFWLogin: true,
  navLinksInNewTab: false,
  customColorTheme: '',
  language: 'en',
  useAlternativeLanguage: false,
  alternativeWebmap: '',
  alternativeLanguage: 'fr',
  alternativeLanguageTitle: 'GFW Mapbuilder',
  alternativeLanguageSubtitle: 'Make maps that matter',
  alternativeMapThemes: '',
  alternativeNarrative: '',
  alternativeWebmapMenuName: 'Land Use',
  initialExtent: {
    x: null,
    y: null,
    z: null
  },
  includeDocumentsTab: false,
  iso: '',
  viirsFires: true,
  modisFires: true,
  intactForests: true,
  primaryForests: true,
  forma: false,
  aboveGroundBiomass: true,
  landCover: true,
  mangroves: false,
  sadAlerts: true,
  gladAlerts: true,
  terraIAlerts: true,
  recentImagery: true,
  webmapMenuName: 'Land Use',
  sharinghost: 'https://www.arcgis.com',
  analyticsCode: '',
  includeCartoTemplateLayers: false,
  cartoUser: 'wri-01',
  cartoTemplateId: 'tpl_07c315f8_c13e_11e4_b457_0e8dde98a187',
  cartoApiKey: 'your key here',
  cartoGroupLabel: {
    en: 'Carto Layers',
    fr: 'Carto Layers'
  },
  disabledAnalysisModules: [], //'VIIRS_FIRES', 'GLAD_ALERTS', 'TC_LOSS', 'IFL', 'LCC'
  layerPanel: {
    GROUP_WEBMAP: {
      order: 2,
      label: {},
      layers: []
    },
    GROUP_CLIMATE: {
      groupType: 'default',
      order: 4,
      label: {
        en: 'Climate',
        fr: 'Climat',
        es: 'Clima',
        pt: 'Clima',
        id: 'Iklim',
        zh: '气候',
        ka: 'კლიმატი',
        hy: 'Կլիմա',
        az: 'İqlim',
        nl: 'Klimaat'
      },
      layers: [
        {
          id: 'CARBON_SEQ',
          order: 1,
          type: 'remoteDataLayer',
          uuid: 'e7208398-0acd-4f73-a824-c4fe1e356e0c'
        },
        {
          id: 'CARBON_EMISSIONS',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '6d989ac9-ab57-4f95-8475-2e747a3adc10'
        }
      ]
    },
    GROUP_LCD: {
      groupType: 'default',
      order: 1,
      label: {
        en: 'Land Cover Dynamics',
        fr: 'Evolution de la couverture des sols',
        es: 'Dinámica de la Cobertura del Suelo',
        pt: 'Dinâmica de cobertura da terra ',
        id: 'Land Cover Dynamics',
        zh: '土地覆盖动态数据',
        ka: 'მიწის საფარის დინამიკა'
      },
      layers: [
        {
          id: 'TREE_COVER_LOSS',
          order: 1,
          type: 'remoteDataLayer',
          uuid: '2aed67b3-3643-40d3-9c1e-8af9afb5d9e2'
        },
        {
          id: 'TREE_COVER_GAIN',
          order: 2,
          type: 'remoteDataLayer',
          uuid: 'cb016f17-f12d-463a-9dc2-aabcf5db566c'
        },
        {
          id: 'IMAZON_SAD',
          order: 3,
          type: 'remoteDataLayer',
          uuid: '3e9e86ae-e38d-4c59-8484-c8214ca5186a'
        },
        {
          id: 'FORMA_ALERTS',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '56aa7e57-0ac4-446c-a82d-7713904b17c3'
        },
        {
          id: 'GLAD_ALERTS',
          order: 5,
          type: 'remoteDataLayer',
          uuid: '356f862b-3e70-493a-997b-dc2a193410e9'
        },
        {
          id: 'TERRA_I_ALERTS',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '1fc7b0c5-259a-4685-8665-b2f1ed3f808f'
        },
        {
          id: 'VIIRS_ACTIVE_FIRES',
          order: 7,
          type: 'remoteDataLayer',
          uuid: '6d316908-92c8-4f95-8598-f2a0c72786af'
        },
        {
          id: 'MODIS_ACTIVE_FIRES',
          order: 8,
          type: 'remoteDataLayer',
          uuid: '8ae39d34-a5e5-4742-b06e-6e913a8f1eb8'
        }
      ]
    },
    GROUP_LC: {
      groupType: 'default',
      order: 3,
      label: {
        en: 'Land Cover',
        fr: 'Couverture des sols',
        es: 'Cobertura terrestre',
        pt: 'Cobertura do Solo',
        id: 'Land Cover',
        zh: '土地覆盖',
        ka: 'მიწის საფარი'
      },
      layers: [
        {
          id: 'IFL',
          order: 2,
          type: 'remoteDataLayer',
          uuid: '5f815a7d-457e-4eae-a8e5-8864a60696ad'
        },
        {
          id: 'PRIMARY_FORESTS',
          order: 3,
          type: 'remoteDataLayer',
          uuid: 'edffb745-e523-462d-ad1e-3052006a3dbc'
        },
        {
          id: 'AG_BIOMASS',
          order: 4,
          type: 'remoteDataLayer',
          uuid: '04526d47-f3f5-4f76-a939-e5f7861fd085'
        },
        {
          id: 'LAND_COVER',
          order: 5,
          type: 'remoteDataLayer',
          uuid: 'b8d3f175-0565-443f-839a-49eb890a4b3d'
        },
        {
          id: 'TREE_COVER',
          order: 6,
          type: 'remoteDataLayer',
          uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7'
        }
      ]
    },
    GROUP_IMAGERY: {
      groupType: 'imagery',
      order: 4,
      label: {
        en: 'Recent Imagery',
        fr: 'Recent Imagery',
        es: 'Recent Imagery',
        pt: 'Recent Imagery',
        id: 'Recent Imagery',
        zh: 'Recent Imagery',
        ka: 'Recent Imagery'
      },
      layers: [
        {
          order: 1,
          id: 'RECENT_IMAGERY',
          type: 'imagery',
          technicalName: 'recent_satellite_imagery',
          visible: false,
          label: {
            en: 'Recent Imagery',
            fr: 'Recent Imagery',
            es: 'Recent Imagery',
            pt: 'Recent Imagery',
            id: 'Recent Imagery',
            zh: 'Recent Imagery',
            ka: 'Recent Imagery'
          },
          dynamicSublabel: {
            en: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            fr: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            es: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            pt: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            id: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            zh: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})',
            ka: '({DATE_TIME}, {CLOUD_COVERAGE}% cloud coverage, {INSTRUMENT})'
          }
        }
      ]
    },
    GROUP_BASEMAP: {
      groupType: 'basemap',
      order: 200,
      label: {
        en: 'Basemap',
        fr: 'Basemap',
        es: 'Basemap',
        pt: 'Basemap',
        id: 'Basemap',
        zh: 'Basemap',
        ka: 'საბაზო რუკა'
      },
      layers: [
        {
          id: 'landsat',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/basemaps-sdd18a411a3-5bf18f445e58b8766f773184b7741c67.png',
          templateUrl: 'https://d2h71bpqsyf4vw.cloudfront.net/2016/${level}/${col}/${row}.png',
          years: [
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016'
          ],
          title: {
            en: 'Landsat',
            fr: 'Landsat',
            es: 'Landsat',
            pt: 'Landsat',
            id: 'Landsat',
            zh: 'Landsat',
            ka: 'Landsat'
          }
        },
        {
          id: 'wri_mono',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          title: {
            en: 'WRI Mono',
            fr: 'WRI Mono',
            es: 'WRI Mono',
            pt: 'WRI Mono',
            id: 'WRI Mono',
            zh: 'WRI Mono',
            ka: 'WRI Mono'
          }
        },
        {
          id: 'wri_contextual',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_contextual.png',
          title: {
            en: 'WRI Contextual',
            fr: 'WRI Contextual',
            es: 'WRI Contextual',
            pt: 'WRI Contextual',
            id: 'WRI Contextual',
            zh: 'WRI Contextual',
            ka: 'WRI Contextual'
          }
        },
        {
          id: 'planet',
          thumbnailUrl: 'https://my.gfw-mapbuilder.org/img/wri_mono.png',
          url: 'https://tiles.globalforestwatch.org/planet/v1/planet_medres_normalized_analytic/{z}/{x}/{y}.png',
          apiKey: '90f59f82-8d32-46e4-accb-f8d7f35b309a',
          title: {
            en: 'Planet',
            fr: 'Planet',
            es: 'Planet',
            pt: 'Planet',
            id: 'Planet',
            zh: 'Planet',
            ka: 'Planet'
          }
        }
      ]
    },
    extraLayers: [
      {
        id: 'MASK',
        type: 'dynamic',
        order: 10000,
        url: 'https://gis.forest-atlas.org/server/rest/services/country_masks/country_mask_global/MapServer',
        opacity: 0.35,
        layerIds: [0]
      },
      {
        id: 'LEGEND_LAYER',
        type: 'dynamic',
        url: 'https://gis-gfw.wri.org/arcgis/rest/services/legends/MapServer',
        visible: false,
        opacity: 0,
        layerIds: []
      },
      {
        id: 'USER_FEATURES',
        type: 'graphic',
        visible: true
      }
    ]
  }
};
