import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MapInfo } from '../models/map-info';

@Injectable()
export class AppService {

    readonly mapInfo = new BehaviorSubject<MapInfo | null>(null);
}
