import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CityService {
  private savedCities: { name: string; temperature: number; description: string }[] = [];

  saveCity(cityData: { name: string; temperature: number; description: string }) {
    const exists = this.savedCities.find(c => c.name.toLowerCase() === cityData.name.toLowerCase());
    if (!exists) {
      this.savedCities.unshift(cityData);
      if (this.savedCities.length > 10) this.savedCities.pop();
    }
  }

  getCities() {
    return this.savedCities;
  }
}
