import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface VisualizationData {
  totalEmp: number;
  totalCandidate: number;
  totalAdmin: number;
  employees: {
    female: number;
    male: number;
  };
  candidates: {
    female: number;
    male: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3333/auth/visualize';

  constructor(private http: HttpClient) { }

  getUserVisualize(): Observable<VisualizationData> {
    return this.http.get<VisualizationData>(`${this.apiUrl}`);
  }
}
