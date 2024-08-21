import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PositionService, Position } from '../position-manage/position.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { PositionUpdateComponent } from '../position/position-update/position-update.component';

@Component({
  selector: 'app-position-manage',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule,PositionUpdateComponent],
  templateUrl: './position-manage.component.html',
  styleUrls: ['./position-manage.component.scss']
})
export class PositionManageComponent implements OnInit {
  items=[
    {
      id:'1',name:'create new position',Link:'/dashboard/position'
    },
    {
      id:'2',name:'manage', Link:'/dashboard/manage',
    },
    {
      id:'3',name: 'Update', Link:'dashboard/positon/update'
    }
    
    ]
    positions: Position[] = [];
    editForm: FormGroup;
    editingPositionId: string | null = null;

    constructor(private positionService: PositionService, private fb: FormBuilder) {
      this.editForm = this.fb.group({
        name: ['', Validators.required],
        employeeId: ['', Validators.required],
        workArea: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.fetchPositions();
    }
  
    fetchPositions(): void {
      this.positionService.getPositions().subscribe(
        (data: Position[]) => {
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
            this.positions = this.positions.filter(pos => pos.positionId !== positionId);
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
