import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserVisualizationComponent } from '../visualization/visualization.component';
import { filter } from 'rxjs/operators';
import { AuthService, Token } from '../services/app-context.service';

export interface MenuItem {
  icon: string;
  link: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, UserVisualizationComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  showVisualization: boolean = false;
  isCollapsed: boolean = false;
  isMenuActive: boolean = false;
  isActive: boolean = false;
  user: Token | null = null;

  // Define all possible menu items
  allItems: MenuItem[] = [
    { icon: '<i class="bi bi-speedometer2"></i>', link: '/dashboard', name: 'Dashboard' },
    { icon: '<i class="bi bi-buildings"></i>', link: '/dashboard/company', name: 'Company' },
    { icon: '<i class="bi bi-gear-fill"></i>', link: '/dashboard/users', name: 'Users' },
    { icon: '<i class="bi bi-people-fill"></i>', link: '/dashboard/candidate', name: 'Candidate' },
    { icon: '<i class="bi bi-briefcase-fill"></i>', link: '/dashboard/position', name: 'Position' },
    { icon: '<i class="bi bi-diagram-3-fill"></i>', link: '/dashboard/departement', name: 'Department' },
    { icon: '<i class="bi bi-person-fill"></i>', link: '/dashboard/employee', name: 'Employee' },
    { icon: '<i class="bi bi-currency-dollar"></i>', link: '/dashboard/salary', name: 'Salary' },
    {icon:'<i class="bi bi-check"></i>', link: '/dashboard/attendance', name: 'Attendance' },
  ];

  // Items to be displayed in the menu based on user role
  items: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Check the initial route to display the visualization by default
    let token=localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/login']);
    }
    this.showVisualization = this.router.url === '/dashboard';

    // Subscribe to router events to handle navigation changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Only care about NavigationEnd events
      .subscribe((event: NavigationEnd) => {
        this.showVisualization = event.urlAfterRedirects === '/dashboard';
      });

    // Add window resize event listener to handle responsive design
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();

    // Retrieve and assign the decoded token
    this.user = this.authService.decodedToken;

    // Display menu items based on the user's role
    if (this.user) {
      this.filterMenuItemsByRole(this.user.role);
    }
  }

  ngOnDestroy(): void {
    // Remove window resize event listener when component is destroyed
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize(): void {
    // Automatically collapse the sidebar on smaller screens
    const windowWidth = window.innerWidth;
    this.isCollapsed = windowWidth < 992; // Collapse on screens smaller than 992px
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.isCollapsed = !this.isCollapsed;
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  logout(): void {
    // Logout logic
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Method to filter menu items based on user role
  private filterMenuItemsByRole(role: string): void {
    if (role === 'admin') {
      this.items = this.allItems; // Display all items for admin
    } else if (role === 'employee') {
      this.items = this.allItems.filter(
        (item) => item.name === 'Dashboard' || item.name === 'Employee' ||item.name==='Attendance'
      );
    } else if (role === 'candidate') {
      this.items = this.allItems.filter(
        (item) => item.name === 'Dashboard' || item.name === 'Candidate'  || item.name==='Attendance'
      );
    } else {
      // Handle any other roles if necessary
      this.items = [];
    }
  }
}
