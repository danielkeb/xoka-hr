import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/app-context.service';
import { CommonModule } from '@angular/common';

interface ListItem {
  name: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-main-list-items',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './main-list-items.component.html',
  styleUrls: ['./main-list-items.component.scss']
})
export class MainListItemsComponent implements OnInit, OnDestroy {
  LIST_ITEMS: ListItem[] = [];
  activeIndex: number = 0;
  userRole: string = '';
  path: string = '';
  private authSubscription: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.decodedToken?.['role'] || '';
    this.setListItems();
    
    this.authSubscription.add(this.router.events.subscribe(() => {
      this.path = this.router.url;
      this.checkActiveRoute();
    }));
    
    this.checkAuthentication();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
isOpen(){
  
}
  private setListItems() {
    const adminItems: ListItem[] = [
      // Define list items for admin
    ];

    const securityItems: ListItem[] = [
      // Define list items for security
    ];

    this.LIST_ITEMS = this.userRole === 'admin' ? adminItems : securityItems;
  }

  private checkActiveRoute() {
    this.LIST_ITEMS.forEach((item, index) => {
      if (this.path === item.href) {
        this.activeIndex = index;
      }
    });
  }

  private checkAuthentication() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else if (this.isRestrictedRoute()) {
      this.router.navigate(['/dashboard']);
    }
  }

  private isRestrictedRoute(): boolean {
    // Implement your logic to determine if the route is restricted
    return false;
  }
}
