import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { Users, UsersService } from './company.service';
import { CommonModule } from '@angular/common';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app.company',
  styleUrl: 'company.component.scss',
  templateUrl: 'company.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterModule, UserComponent, CommonModule],
})
export class CompanyComponent implements OnInit, AfterViewInit {

  private apiUrl = 'http://localhost:3333/company'; 
  apiImage = `${this.apiUrl}/logo`; 
  items = [
    { id: '1', name: 'Create New Company', Link: '/dashboard/company' },
    { id: '2', name: 'Manage Comp.', Link: '/dashboard/manage/company' },
    { id: '3', name: 'Update Comp.', Link: '/dashboard/update/company' },
  ];
  displayedColumns: string[] = [
    'companyId',
    'name',
    'industry',
    'address',
    'contact',
    'logo',
    'actions',
  ];

  // Data source for the Material table
  dataSource = new MatTableDataSource<Users>();

  // Reference to the MatPaginator for pagination control
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users on component initialization
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Set paginator after view initialization
  }
 

  /**
   * Fetch users from the server using UsersService
   */




  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      (data: Users[]) => {
        this.dataSource.data = data; // Set the data source with the fetched users
      },
      (error) => {
        console.error('Error fetching users', error); // Log errors if any
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this company?')) {
    this.usersService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted:', userId); // Log the deleted user ID
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
    // For example, disable if userId is null or any other condition:
    if (item.id === '3') {
      return true; // Disable Update User if userId is null
    }
    return false; // Enable link by default
  }
}




