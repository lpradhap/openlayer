import Map from 'ol/Map';
import View from 'ol/View';
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import OsmSource from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';

import { FeatureLike } from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON.js';
import { defaults as defaultInteractions } from 'ol/interaction';
import BaseLayer from 'ol/layer/Base';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorImageLayer from 'ol/layer/VectorImage';
export class MapService {

    public readonly map: Map;
    private readonly tileLayer: TileLayer<OsmSource>;
    private readonly vectorLayer: VectorLayer<any>;

    selectedTileSource = { name: 'OSM', source: new OsmSource() };

    constructor() {
        this.tileLayer = new TileLayer();
        this.vectorLayer = new VectorLayer<any>();

        this.map = new Map({
            layers: [
                this.tileLayer,
                this.vectorLayer
            ],
            view: new View({
                center: fromLonLat([40, 15]),
                zoom: 3
            }),
            interactions: defaultInteractions().extend([new Select({})])
        })



    }

    setTileSource(source = this.selectedTileSource): void {
        this.selectedTileSource = source;
        this.tileLayer.setSource(source.source);
    }

    updateSize(target = 'map'): void {
        this.map.setTarget(target);
        this.map.updateSize();
    }

    setVectorSource(url: string): void {

        const vectorLayer = new VectorImageLayer({
            source: new VectorSource({
                url: url,
                format: new GeoJSON(),
            }),
            zIndex: 1,
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 1,
                }),
                fill: new Fill({
                    color: [255, 0, 0, 0.5]
                }),
            })
        })

        this.addLayerToMap(vectorLayer);

    }

    addLayerToMap(vectorLayer: BaseLayer): void {
        this.map.addLayer(vectorLayer)
    }


}