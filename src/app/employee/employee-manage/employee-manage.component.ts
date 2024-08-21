import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee, Employees, EmployeeService } from './empoyee.service';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';

@Component({
  selector: 'app-employee-manage',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule,EmployeeUpdateComponent],
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {
  items=[
    {
      id:'1',name:'create new Employee',Link:'/dashboard/employee'
    },
    {
      id:'2',name:'manage', Link:'/dashboard/manage',
    },
    {
      id:'3',name: 'Update', Link:'dashboard/employee/update'
    }
    
    ]
    positions: Employees[] = [];
    editForm: FormGroup;
    editingPositionId: string | null = null;

    constructor(private positionService: EmployeeService, private fb: FormBuilder) {
      this.editForm = this.fb.group({
        positionId: ['', Validators.required],
        departementId: ['', Validators.required],
        experience: ['', Validators.required],
        salaryId:['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.fetchPositions();
    }
  
    fetchPositions(): void {
      this.positionService.getPositions().subscribe(
        (data: Employees[]) => {
          this.positions = data;
        },
        (error) => {
          console.error('Error fetching positions', error);
        }
      );
    }
  
    
  
    deletePosition(positionId: string): void {
      if (confirm('Are you sure you want to delete this position?')) {
        this.positionService.deletePosition(positionId).subscribe(
          () => {
            this.positions = this.positions.filter(pos => pos.employeeId !== positionId);
            console.log('Position deleted successfully');
          },
          (error) => {
            console.error('Error deleting position', error);
          }
        );
      }
    }
  
    cancelEdit(): void {
      this.editingPositionId = null;
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
  }
