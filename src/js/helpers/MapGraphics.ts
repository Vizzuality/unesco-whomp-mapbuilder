import { loadModules } from 'esri-loader';

import { mapController } from '../../js/controllers/mapController';
import { getCustomSymbol, getPointSymbol } from '../../js/helpers/generateSymbol';
import { FeatureResult } from '../../js/store/mapview/types';

const setSymbol = (symbolType: string): Promise<__esri.SimpleFillSymbol | __esri.SimpleMarkerSymbol> => {
  switch (symbolType) {
    case 'polygon':
      return getCustomSymbol();
    case 'point':
      return getPointSymbol();
    default:
      console.warn('potential edge case in setSymbol()', symbolType);
      return getCustomSymbol();
  }
};

const setGeometry = async (symbolType: string, geometry: __esri.Geometry): Promise<any> => {
  const [Point, Polygon] = await loadModules(['esri/geometry/Point', 'esri/geometry/Polygon']);
  switch (symbolType) {
    case 'polygon':
      return new Polygon(geometry);
    case 'point':
      return new Point(geometry);
    default:
      console.warn('potential edge case in setGeometry()', symbolType);
      return new Polygon(geometry);
  }
};

//Helper for Report graphics in order to add POINT to the map
export async function addPointGraphic(map: __esri.Map, feature: any): Promise<void> {
  const [GraphicsLayer, Graphic, Point] = await loadModules([
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
    'esri/geometry/Point'
  ]);
  let graphicsLayer: any = map.findLayerById('active-feature-layer');
  let graphicsLayerExists = graphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
    graphicsLayerExists = true;
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
    graphicsLayerExists = false;
  }
  const symbol = await setSymbol('point');
  const geometry = new Point({
    x: feature.geometry.x,
    y: feature.geometry.y
  });
  const pointGraphic = new Graphic({
    symbol: symbol,
    geometry: geometry
  });
  graphicsLayer.add(pointGraphic);
  if (!graphicsLayerExists) {
    map.add(graphicsLayer);
  }
}

interface GraphicConfig {
  map: __esri.Map;
  mapview: __esri.MapView;
  allFeatures: Array<FeatureResult>;
  isUploadFile: boolean;
}

export function clearGraphics() {
  if (!mapController._map) return;
  const graphicsLayer = mapController._map.findLayerById('active-feature-layer') as __esri.GraphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
  }
}

export function clearUserGraphics() {
  if (!mapController._map) return;
  const graphicsLayer = mapController._map.findLayerById('user_features') as __esri.GraphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
  }
}

export async function removeIntersectingGraphic() {
  const graphicsLayer = mapController._map?.findLayerById('overlap-feature-layer') as __esri.GraphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
  }
}

export async function clearMultiPolygonLayer() {
  const graphicsLayer = mapController._map?.findLayerById('multi_poly_graphics') as __esri.GraphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
  }
}

export async function addToMultiPolygonLayer(geometry: __esri.Geometry) {
  const [GraphicsLayer, Graphic] = await loadModules(['esri/layers/GraphicsLayer', 'esri/Graphic']);
  let graphicsLayer = mapController._map?.findLayerById('multi_poly_graphics') as __esri.GraphicsLayer;
  if (!graphicsLayer) {
    graphicsLayer = new GraphicsLayer({
      id: 'multi_poly_graphics'
    });
  }
  if (!mapController._map) return;
  mapController._map.add(graphicsLayer);

  const graphic = new Graphic({
    geometry: geometry,
    symbol: {
      type: 'simple-fill',
      color: [0, 0, 0, 0],
      outline: {
        color: [115, 252, 253],
        width: 2
      }
    }
  });
  graphicsLayer.add(graphic);
}

export async function drawIntersectingGraphic(geometry: __esri.Geometry | __esri.Geometry[]): Promise<void> {
  const [GraphicsLayer, Graphic] = await loadModules(['esri/layers/GraphicsLayer', 'esri/Graphic']);

  let graphicsLayer = mapController._map?.findLayerById('overlap-feature-layer') as __esri.GraphicsLayer;
  if (graphicsLayer) {
    graphicsLayer.removeAll();
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'overlap-feature-layer'
    });
  }

  const overlapGraphic = new Graphic({
    geometry: geometry,
    symbol: {
      type: 'simple-fill',
      color: [255, 0, 0, 0.5], // red
      outline: {
        color: [255, 0, 0, 0.5], // red
        width: 1
      }
    }
  });

  graphicsLayer.add(overlapGraphic);
  if (mapController._map) {
    mapController._map.add(graphicsLayer);
  }
}

export async function setNewGraphic({ map, mapview, allFeatures, isUploadFile }: GraphicConfig): Promise<void> {
  const [GraphicsLayer, Graphic, projection] = await loadModules([
    'esri/layers/GraphicsLayer',
    'esri/Graphic',
    'esri/geometry/projection'
  ]);
  //TODO: this needs a refactor, we are handling file uploads and featues on the map with a single
  //function, we likely need to either reuse multiple functions or split this up
  let graphicsLayer: any = map.findLayerById('active-feature-layer');

  if (graphicsLayer) {
    graphicsLayer.removeAll(); //TODO: We may need to support multiple selected features in future
  } else {
    graphicsLayer = new GraphicsLayer({
      id: 'active-feature-layer'
    });
  }

  if (!isUploadFile) {
    let isPolygon = false;
    if (allFeatures[0].geometry?.type === 'polygon' || allFeatures[0].geometry.hasOwnProperty('rings')) {
      isPolygon = true;
    }
    const symbol = isPolygon ? await setSymbol('polygon') : await setSymbol('point');

    const geometry = isPolygon
      ? await setGeometry('polygon', allFeatures[0].geometry)
      : await setGeometry('point', allFeatures[0].geometry);

    const featureGraphic = new Graphic({
      geometry: geometry,
      attributes: allFeatures[0].attributes,
      symbol: symbol
    });

    graphicsLayer.graphics.add(featureGraphic);
    map.add(graphicsLayer);
    return;
  }

  if (isUploadFile) {
    projection.load().then(() => {
      const allGraphics = allFeatures.map(async (feature: FeatureResult, index: number) => {
        const isPolygon = (feature.geometry as any).rings || feature.geometry.type === 'polygon';

        /**
         * * NOTE:
         * * File uploads don't have a geometry.type,
         * * so we have to check if it has geometry.rings
         */

        const symbol = isPolygon ? await setSymbol('polygon') : await setSymbol(feature.geometry.type);

        if (index === 0) {
          //First feature is "active" by default > change it to appropriate color
          //@ts-ignore TODO: test this
          symbol.outline.color = [115, 252, 253];
        }
        const geometry = isPolygon
          ? await setGeometry('polygon', feature.geometry)
          : await setGeometry(feature.geometry.type, feature.geometry);

        const featureGraphic = new Graphic({
          geometry: geometry,
          attributes: feature.attributes,
          symbol: symbol
        });

        if (!mapController._mapview) return;
        const transformation = projection.getTransformation(
          featureGraphic.geometry.spatialReference,
          mapController._mapview.spatialReference
        );

        featureGraphic.geometry = projection.project(
          featureGraphic.geometry,
          mapController._mapview.spatialReference,
          transformation
        ) as __esri.Geometry;

        return featureGraphic;
      });

      graphicsLayer.graphics.push(...allGraphics);
      mapController.initializeAndSetSketch(graphicsLayer.graphics);

      mapview.goTo(allGraphics);
    });
    return;
  }
}
