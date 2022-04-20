import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiURL = 'http://api.openweathermap.org/';
  private apikey = 'dc361372f07daf7ad76be87b0b5d9e82';

  constructor(private http: HttpClient) {}

  public getLocationCoordinates(locationName: string) {
    return this.http.get(
      this.apiURL + 'geo/1.0/direct?q=' + locationName + '&appid=' + this.apikey
    );
  }

  public getWeatherForecast(lat: string, lon: string) {
    return this.http.get(
      this.apiURL +
        'data/2.5/forecast?lat=' + lat +
        '&lon=' + lon +
        '&appid=' +
        this.apikey
    );
  }

  public getDailyWeatherForecast(lat: string, lon: string){
      return this.http.get(
        this.apiURL+'data/2.5/onecall?lat='+lat+
        '&lon='+lon+
        '&exclude=hourly'+
        '&appid='+
        this.apikey

      );
  }
}
