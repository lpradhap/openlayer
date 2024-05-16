import { Collection, Feature } from "ol";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";

export interface IGeoData {
    readonly name: string;
    readonly geoData: {
        type: string;
        features: any;
    }
}