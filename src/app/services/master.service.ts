import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private httpClient = inject(HttpClient);

  constructor() {}

  private api = environment.API_URL;

  //#region get

  getBikes() {
    return this.httpClient.get<any>(`${this.api}/bike`);
  }

  getBikeDetailsById(id: number) {
    return this.httpClient.get<any>(`${this.api}/bike/${id}`);
  }

  getMaintenanceDetailsById(id: number) {
    return this.httpClient.get<any>(`${this.api}/maintenance/${id}`);
  }

  //#endregion

  //#region post

  addBike(data: any) {
    return this.httpClient.post<any>(`${this.api}/bike`, data);
  }

  addMaintenance(data: any) {
    return this.httpClient.post<any>(`${this.api}/maintenance`, data);
  }

  //#endregion

  //#region put

  updateBikeDetails(id: number, data: any) {
    return this.httpClient.put<any>(`${this.api}/bike/${id}`, data);
  }

  updateMaintenance(id: number, data: any) {
    return this.httpClient.put<any>(`${this.api}/maintenance/${id}`, data);
  }

  //#endregion
}
