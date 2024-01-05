import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, StatEndpoints } from '../../config/endpoints/stat-endpoints';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) {}

  fetchExpeditions() {
    return this.http.get(`${API_URL}${StatEndpoints.education}`);
  }
  
}
