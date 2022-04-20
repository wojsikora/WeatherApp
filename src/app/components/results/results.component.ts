import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { WeatherFutureInfo } from 'src/app/shared/models/WeatherFutureInfo';
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
  today_date: string;
  next_week_days: string[];
  futureWeatherMap = new Map<string, WeatherFutureInfo>([]);
  weatherInfo: WeatherInfo = {
    temperature: '',
    felt_temperature: '',
    pressure: '',
    humidity: '',
    weather: '',
    weather_desc: '',
    wind_speed: '',
  };
  weatherIconMap = new Map<string, string>([
    ['Clouds', 'filter_drama'],
    ['Rain', 'umbrella'],
    ['Clear', 'wb_sunny'],
    ['Snow', 'ac_unit'],
    ['Extreme', 'electric_bolt'],
  ]);

  

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
        this.getWeather(data[0].lat, data[0].lon);
      });
  }

  getWeather(lat: string, lon: string) {
    this.weatherService.getWeatherForecast(lat, lon).subscribe((data: any) => {
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

      this.today_date = data.list[0].dt_txt.split(' ')[0];
      this.next_week_days=this.setDates();
      console.log(this.next_week_days);
      this.getDailyWeather(lat, lon);
    });
  }

  getDailyWeather(lat: string, lon: string) {
    this.weatherService
      .getDailyWeatherForecast(lat, lon)
      .subscribe((data: any) => {
        console.log(data.daily);
        for(var i=0; i<=7; i++){
          this.futureWeatherMap.set(this.next_week_days[i], {
            temperature: (data.daily[i].temp.day - this.kelvinScale).toPrecision(2),
            weather: data.daily[i].weather[0].main,
            weather_desc: data.daily[i].weather[0].description
          });
        }
        console.log(this.futureWeatherMap.get(this.next_week_days[0]));
        
      });
  }

  setDates() {
    let array = [];

    for (var i = 0; i <= 7; i++) {
      var nextDay = new Date(this.today_date);
      nextDay.setDate(nextDay.getDate() + i);
      array.push(nextDay.toLocaleDateString());
    }

    return array;
  }
}
