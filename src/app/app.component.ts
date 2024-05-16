import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { AppService } from './services/app.service';
import { MapService } from './services/map.service';
import { geoJson } from '../data/geojson';
import { MapInfoComponent } from './components/map-info/map-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, MapInfoComponent],
  providers: [AppService, MapService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'geoTravel';

  constructor(

    private mapService: MapService
  ) { }

  ngAfterViewInit() {
    this.mapService.setTileSource();
    this.mapService.updateSize();
    this.mapService.setVectorSource(geoJson[0].url);
  }

}
