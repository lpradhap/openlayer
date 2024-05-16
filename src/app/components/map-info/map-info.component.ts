import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MapService } from '../../services/map.service';
import { FeatureLike } from 'ol/Feature';
import { MapInfo } from '../../models/map-info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-info.component.html',
  styleUrl: './map-info.component.css'
})
export class MapInfoComponent {

  public mapProps: MapInfo | undefined;

  public isVisible = false;

  constructor(private appService: AppService, private mapService: MapService) { }

  ngOnInit(): void {

    this.mapService.map.addEventListener('click', (e: any) => {
      this.mapService.map.forEachFeatureAtPixel(e.pixel, (feature: FeatureLike, layer) => {
        this.setMapInfo(feature.getProperties() as MapInfo)

      })
    })

  }

  setMapInfo(info: MapInfo): void {

    try {
      this.mapProps = info;
      this.isVisible = !!Object.keys(info).length;
      this.hideScroll();
      console.log(this.mapProps)
    } catch {

    }

  }

  handleClose(): void {
    this.isVisible = false;
    this.mapProps = undefined;
    this.hideScroll();
  }

  hideScroll(): void {
    if (this.isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }


  }

}
