import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
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
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private data: DataService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      locationName: ['', [Validators.required]],
    });

    this.data.currenctMessage.subscribe(message => this.message = message)
  }

  onSubmit() {
    if (this.weatherForm.valid) {
      console.log(this.weatherForm.value);
      this.data.changeMessage(this.weatherForm.value.locationName);
      this.route.navigate(['/result']);
      // this.weatherService.getLocationCoordinates(this.weatherForm.value.locationName).subscribe(
      //   (data: any) => {
      //     console.log(data[0].lat, data[0].lon);
      //     this.getWeather(data[0].lat, data[0].lon, '10');
      //   }
      // )
    }
  }

  // getWeather(lat: string, lon: string, cnt: string){
  //   this.weatherService.getWeatherForecast(lat, lon, cnt).subscribe((data: any)=> {
  //     this.temp = (data.list[0].main.temp-this.kelvinScale).toPrecision(2);
  //   })
  // }
}
