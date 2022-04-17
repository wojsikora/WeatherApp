import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  locationName: string;
  kelvinScale = 273.15;
  temp: string;

  constructor(
    private weatherService: WeatherService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.currenctMessage.subscribe((locationName) => (this.locationName = locationName));
    this.weatherService.getLocationCoordinates(this.locationName).subscribe(
      (data: any) => {
        console.log(data[0].lat, data[0].lon);
        this.getWeather(data[0].lat, data[0].lon, '10');
      }
    )
  }

  getWeather(lat: string, lon: string, cnt: string){
    this.weatherService.getWeatherForecast(lat, lon, cnt).subscribe((data: any)=> {
      this.temp = (data.list[0].main.temp-this.kelvinScale).toPrecision(2);
    })
  }
}
