import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private apiKey = 'a2ceb5edac974702f70d99cedf79dde4';
  private apiUrl = 'http://api.weatherstack.com/current';

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?access_key=${this.apiKey}&query=${city}`);
  }
}
