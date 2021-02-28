import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PlateDataService } from './plate-data.service';
import { Plate } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private plateDataService: PlateDataService) {}

  plateData: Observable<Plate[][]>;

  ngOnInit() {
    this.plateData = this.plateDataService.loadPlates();
  }

  onPlateClick(plate: Plate) {
    // If a plate is being removed confirm that the user actually wants to remove it
    // This will cover accidental clicks
    let remove: boolean;
    if (plate.active) {
      remove = window.confirm(`Remove Plate ${plate.plate}`)
    }

    // If the user wants to remove it or if we're making it active go ahead and update it
    if (remove || !plate.active) {
      // Set the plate to the opposite status
      plate.active = !plate.active;

      // Update the db
      this.plateDataService.updatePlate(plate).subscribe(success => {
        if (!success) {
          // If the db update failed set the plate back to the original status
          plate.active = !plate.active;
        }
      });
    }
  }

}
