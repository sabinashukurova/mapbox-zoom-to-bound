import type {FillLayer, LineLayer} from 'react-map-gl';
import * as DATA from '../src/data/CityData.json';
import * as MAP_STYLE from '../src/map-style.json'

const sfNeighborhoods = {
  type: 'geojson',
  data: DATA
};

const fillLayer: FillLayer = {
  id: 'sf-neighborhoods-fill',
  source: 'sf-neighborhoods',
  type: 'fill',
  paint: {
    'fill-outline-color': '#0040c8',
    'fill-color': '#fff',
    'fill-opacity': 0
  }
};

const lineLayer: LineLayer = {
  id: 'sf-neighborhoods-outline',
  source: 'sf-neighborhoods',
  type: 'line',
  paint: {
    'line-width': 2,
    'line-color': '#0080ef'
  }
};

export default {
  ...MAP_STYLE,
  sources: {
    ...MAP_STYLE.sources,
    ['sf-neighborhoods']: sfNeighborhoods,
  },
  layers: [...MAP_STYLE.layers, fillLayer, lineLayer]
};