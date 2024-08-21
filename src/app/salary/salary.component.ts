import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { Users, UsersService } from './salary.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app.salary',
  styleUrl: 'salary.component.scss',
  templateUrl: 'salary.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterModule, UserComponent, CommonModule],
})
export class SalaryComponent implements OnInit{

  private apiUrl = 'http://localhost:3333/salary'; 
  items = [
    { id: '1', name: 'Create New Salary', Link: '/dashboard/salary' },
    { id: '2', name: 'Manage', Link: '/dashboard/manage/salary' },
    { id: '3', name: 'Update', Link: '/dashboard/update/salary' },
  ];
  salarys:Users[]=[]

  // Data source for the Material table
  

  // Reference to the MatPaginator for pagination control
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users on component initialization
  }

  // ngAfterViewInit() {
  //   this.departements.paginator = this.paginator; // Set paginator after view initialization
  // }
 

  /**
   * Fetch users from the server using UsersService
   */




  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      (data: Users[]) => {
        this.salarys = data; // Set the data source with the fetched users
      },
      (error) => {
        console.error('Error fetching users', error); // Log errors if any
      }
    );
  }

  deleteSalary(departementId: string): void {
    if (confirm('Are you sure you want to delete this salary?')) {
    this.usersService.deleteSalary(departementId).subscribe(
      () => {
        console.log('User deleted:', departementId); // Log the deleted user ID
        this.fetchUsers(); // Refresh the table data
      },
      (error) => {
        console.error('Error deleting user', error); // Log errors if any
      }
    );
    }
  }

   // Function to check if the update link should be disabled
   isUpdateDisabled(item: any): boolean {
    // Replace this logic with the actual condition you want to check
    // For example, disable if departementId is null or any other condition:
    if (item.id === '3') {
      return true; // Disable Update User if departementId is null
    }
    return false; // Enable link by default
  }
}




