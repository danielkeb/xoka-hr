// dashboard.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[RouterModule, MatIconButton, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
constructor( private router: Router) {}
  title = 'Dashboard';
  items = [
    { id: '1', link: '/dashboard' },
    { id: '2', link: '/dashboard/employee' },
    { id: '3', link: '/dashboard/candidate' },
    { id: '4', link: '/dashboard/position' },
    { id: '5', link: '/dashboard/departement' }
  ];

  isActive: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  ngOnInit(): void {
    let token= localStorage.getItem('token');
    if(!token){
    this.router.navigate(['/login'])
    }
      
  }
}