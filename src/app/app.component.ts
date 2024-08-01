import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],

  templateUrl:'app.component.html',
  // template: `
  //   <mat-toolbar color="primary">
  //     <mat-toolbar-row>
  //       <button mat-icon-button (click)="toggleSidebar()">
  //         <mat-icon>menu</mat-icon>
  //       </button>
  //       <span>{{ title }}</span>
  //       <span class="spacer"></span>
  //       <button mat-button routerLink="/login" routerLinkActive="active">
  //         Login
  //       </button>
  //       <button mat-button routerLink="/register" routerLinkActive="active">
  //         Sign Up
  //       </button>
  //       <button mat-button routerLink="/dash" routerLinkActive="active">
  //         dashboard
  //       </button>
  //     </mat-toolbar-row>
  //   </mat-toolbar>
  //   <router-outlet></router-outlet>
    
  // `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Application';

  toggleSidebar() {
    // Functionality to toggle sidebar (if any)
  }
}
