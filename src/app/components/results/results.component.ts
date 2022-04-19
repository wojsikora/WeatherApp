import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherInfo } from 'src/app/shared/models/WeatherInfo';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  locationName: string;
  kelvinScale = 273.15;
  temp: string;
  weatherInfo: WeatherInfo = {
    temperature: '',
    felt_temperature: '',
    pressure: '',
    humidity: '',
    weather: '',
    weather_desc: '',
    wind_speed: '',
  };

  constructor(
    private weatherService: WeatherService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.currenctMessage.subscribe(
      (locationName) => (this.locationName = locationName)
    );
    this.weatherService
      .getLocationCoordinates(this.locationName)
      .subscribe((data: any) => {
        console.log(data[0].lat, data[0].lon);
        this.getWeather(data[0].lat, data[0].lon, '10');
      });
  }

  getWeather(lat: string, lon: string, cnt: string) {
    this.weatherService
      .getWeatherForecast(lat, lon, cnt)
      .subscribe((data: any) => {
        console.log(data.list[0]);
        this.weatherInfo.temperature = (
          data.list[0].main.temp - this.kelvinScale
        ).toPrecision(2);
        this.weatherInfo.felt_temperature = (
          data.list[0].main.feels_like - this.kelvinScale
        ).toPrecision(2);
        this.weatherInfo.pressure = data.list[0].main.pressure;
        this.weatherInfo.humidity = data.list[0].main.humidity;
        this.weatherInfo.weather = data.list[0].weather[0].main;
        this.weatherInfo.weather_desc = data.list[0].weather[0].description;
        this.weatherInfo.wind_speed = data.list[0].wind.speed;
      });
  }
}

// values to used:
// - temp
// - felt temp
// - pressure
// - humidity
// - weather - main, description
// - wind - speed
