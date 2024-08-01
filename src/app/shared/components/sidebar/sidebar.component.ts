// src/app/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports:[RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  activePath = '';

  menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Security', path: '/dashboard/security', icon: '🔒' },
    { name: 'Scan', path: '/dashboard/scan', icon: '🔍' },
    { name: 'Pc User', path: '/dashboard/pcuser', icon: '🖥️' },
    { name: 'Task', path: '/dashboard/task', icon: '✅' },
    { name: 'Manage', path: '/dashboard/pcuser/manage', icon: '⚙️' },
    { name: 'Tired User', path: '/dashboard/tired', icon: '😴' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
