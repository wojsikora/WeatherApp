import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/core/services/weather.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  weatherForm: FormGroup;
  kelvinScale = 273.15;
  temp: string;
  location: string;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      locationName: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.weatherForm.valid) {
      console.log(this.weatherForm.value)
      this.weatherService.getLocationCoordinates(this.weatherForm.value.locationName).subscribe(
        (data: any) => {
          console.log(data[0].lat, data[0].lon);
          this.getWeather(data[0].lat, data[0].lon, '10');
        }
      )
    }
  }

  getWeather(lat: string, lon: string, cnt: string){
    this.weatherService.getWeatherForecast(lat, lon, cnt).subscribe((data: any)=> {
      this.temp = (data.list[0].main.temp-this.kelvinScale).toPrecision(2);
    })
  }
}
