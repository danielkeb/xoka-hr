import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Candidate, CandidateService } from './candidate.service';
import { CommonModule } from '@angular/common';
import { CandidateUpdateComponent } from '../candidate-update/candidate-update.component';
@Component({
  selector: 'app-candidate-manage',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule,CandidateUpdateComponent],
  templateUrl: './candidate-manage.component.html',
  styleUrls: ['./candidate-manage.component.scss']
})
export class CandidateManageComponent implements OnInit {
  items=[
    {
      id:'1',name:'create new Candidate',Link:'/dashboard/candidate'
    },
    {
      id:'2',name:'Manage', Link:'/dashboard/manage/candidate',
    },
    {
      id:'3',name: 'Update', Link:'dashboard/update/candidate'
    }
    
    ]
    candidates: Candidate[] = [];
    editForm: FormGroup;
    editingcandidateId: string | null = null;
   apiPdf='http://localhost:3333/hrmsxoka/resume/';
    constructor(private candidateService: CandidateService, private fb: FormBuilder) {
      this.editForm = this.fb.group({
      candidateStatus: ['', Validators.required],
        resume: ['', Validators.required],
        // workArea: ['', Validators.required]
      });
    }
    ngOnInit(): void {
      this.fetchCandidates();
    }


  
    fetchCandidates(): void {
      this.candidateService.getCandidates().subscribe(
        (data: Candidate[]) => {
          this.candidates = data;
        },
        (error) => {
          console.error('Error fetching candidates', error);
        }
      );
    }
  
    
  
    deleteCandidate(candidateId: string): void {
      if (confirm('Are you sure you want to delete this candidate?')) {
        this.candidateService.deleteCandidate(candidateId).subscribe(
          () => {
            this.candidates = this.candidates.filter(cand => cand.candidateId !== candidateId);
            console.log('candition deleted successfully');
          },
          (error) => {
            console.error('Error deleting position', error);
          }
        );
      }
    }
  
    cancelEdit(): void {
      this.editingcandidateId = null;
      this.editForm.reset();
    }

    // Function to check if the update link should be disabled
   isUpdateDisabled(item: any): boolean {
    // Replace this logic with the actual condition you want to check
    // For example, disable if userId is null or any other condition:
    if (item.id === '3') {
      return true; // Disable Update User if userId is null
    }
    return false; // Enable link by default
  }
  openPdf(filename: string): string {
    return `http://localhost:3333/resume/${filename}`;
  }
  }
