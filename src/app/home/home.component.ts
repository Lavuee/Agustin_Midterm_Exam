import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service ';
import { CityService } from '../services/city.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  city = '';
  weatherData: any = null;
  errorMessage = '';
  isLoading = false;
  private sub?: Subscription;

  constructor(
    private weatherService: WeatherService,
    private cityService: CityService
  ) {}

  getWeather() {
    const cityName = this.city.trim();
    if (!cityName) return;

    this.weatherData = null;
    this.errorMessage = '';
    this.isLoading = true;

    this.sub = this.weatherService.getWeather(cityName).subscribe({
      next: (data) => {
        if (data?.success === false) {
          this.errorMessage = data.error?.info || 'Invalid city name';
        } else {
          this.weatherData = {
            name: data.location.name,
            temperature: data.current.temperature,
            description: data.current.weather_descriptions[0]
          };
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'City not found or API error.';
        this.isLoading = false;
      }
    });
  }

  /** 💾 Save the displayed city */
  saveCity() {
    if (this.weatherData) {
      this.cityService.saveCity({
        name: this.weatherData.name,
        temperature: this.weatherData.temperature,
        description: this.weatherData.description
      });
      alert(`${this.weatherData.name} saved successfully!`);
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
