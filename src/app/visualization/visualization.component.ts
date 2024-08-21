import { Component, OnInit } from '@angular/core';
import { ServiceService, VisualizationData } from './service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-visualization',
  standalone: true,
  imports:[CommonModule, RouterModule],
  template: `
    <div *ngIf="visualizationData">
      <h5 class="text-center mt-3">User Visualization</h5>
      <div class="container mt-4">
        <div class="row text-center">
          <div class="col-md-4">
            <h6>Total Employees</h6>
            <p>{{ visualizationData!.totalEmp }}</p>
          </div>
          <div class="col-md-4">
            <h6>Total Candidates</h6>
            <p>{{ visualizationData!.totalCandidate }}</p>
          </div>
          <div class="col-md-4">
            <h6>Total Admins</h6>
            <p>{{ visualizationData!.totalAdmin }}</p>
          </div>
        </div>

        <hr />

        <div class="row text-center">
          <div class="col-md-6">
            <h6>Employees</h6>
            <p>Female: {{ visualizationData!.employees.female }}</p>
            <p>Male: {{ visualizationData!.employees.male }}</p>
          </div>
          <div class="col-md-6">
            <h6>Candidates</h6>
            <p>Female: {{ visualizationData!.candidates.female }}</p>
            <p>Male: {{ visualizationData!.candidates.male }}</p>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="errorMessage" class="alert alert-danger text-center">{{ errorMessage }}</div>
  `,
  styles: [`
    .container {
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f8f9fa;
    }
    h5 {
      color: #007bff;
    }
  `]
})
export class UserVisualizationComponent implements OnInit {
  visualizationData: VisualizationData | null = null;
  errorMessage: string = '';

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getUserVisualize().subscribe(
      data => {
        this.visualizationData = data;
      },
      error => {
        this.errorMessage = 'Unable to fetch visualization data';
        console.error(error);
      }
    );
  }
}
