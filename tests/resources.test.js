import resources from 'resources';


test('resources has the required properties', () => {

  expect(resources).toHaveProperty('webmap');
  expect(resources).toHaveProperty('title', 'GFW Mapbuilder');
  expect(resources).toHaveProperty('language');

  expect(resources).not.toHaveProperty('Lucas');

  if (resources.useAlternativeLanguage) {
    expect(resources).toHaveProperty('alternativeLanguage');
    expect(resources.alternativeLanguage).toBeDefined();
    expect(resources.alternativeLanguage).toBeTruthy();
  }

  expect(resources).toHaveProperty('layerPanel');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.label');
  expect(resources).toHaveProperty('layerPanel.GROUP_WEBMAP.layers');
  expect(resources.layerPanel.GROUP_WEBMAP.layers).toBeInstanceOf(Array);
  expect(resources.layerPanel.GROUP_WEBMAP.layers).toHaveLength(0);

  expect(resources).toHaveProperty('layerPanel.GROUP_LCD'); //we Are checking for these layers in LossControls & LayerLegend
  expect(resources).toHaveProperty('layerPanel.GROUP_LCD.layers');
  expect(resources.layerPanel.GROUP_LCD.layers).toBeInstanceOf(Array);

  expect(resources).toHaveProperty('layerPanel.GROUP_LC'); //same thing
  expect(resources).toHaveProperty('layerPanel.GROUP_LC.layers');
  expect(resources.layerPanel.GROUP_LC.layers).toBeInstanceOf(Array);

  expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP'); //same thing
  expect(resources).toHaveProperty('layerPanel.GROUP_BASEMAP.layers');
  expect(resources.layerPanel.GROUP_BASEMAP.layers).toBeInstanceOf(Array);

  expect(resources).toHaveProperty('layerPanel.extraLayers');
  expect(resources.layerPanel.extraLayers).toBeInstanceOf(Array); //gets concat'ed somewhere!

});

describe('resources layer spec', () => {

  resources.layerPanel.GROUP_LCD.layers.forEach((layer) => {
    it(`the ${layer.id} layer has the properties we need`, () => {
      expect(layer).toHaveProperty('id');
      expect(layer).toHaveProperty('type');
      expect(layer).toHaveProperty('url');
      expect(layer).toHaveProperty('label');
      expect(layer.label).toHaveProperty(resources.language);
    });
  });

  resources.layerPanel.GROUP_LC.layers.forEach((layer) => {
    it(`the ${layer.id} layer has the properties we need`, () => {
      expect(layer).toHaveProperty('id');
      expect(layer).toHaveProperty('type');
      expect(layer).toHaveProperty('url');
      expect(layer).toHaveProperty('label');
      expect(layer.label).toHaveProperty(resources.language);
    });
  });

  resources.layerPanel.GROUP_BASEMAP.layers.forEach((layer) => {
    it(`the ${layer.id} basemap layer has the properties we need`, () => {
      expect(layer).toHaveProperty('id');
      expect(layer).toHaveProperty('thumbnailUrl');
    });
  });
});
