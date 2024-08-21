import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Candidate {
  candidateId: string;
  resume: string;
  candidateStatus: string;
}

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'http://localhost:3333/Candidate'; // Your API URL

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.apiUrl}/get`);
  }

  getCandidateById(candidateId: string): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/get/${candidateId}`);
  }

  updateCandidate(candidateId: string, formData: FormData): Observable<Candidate> {
    return this.http.patch<Candidate>(`${this.apiUrl}/update/${candidateId}`, formData);
  }

  deleteCandidate(candidateId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${candidateId}`);
  }
}
