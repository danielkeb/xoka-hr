import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
items=[
{
  id:'1',name:'create new position',Link:'/dashboard/position'
},
{
  id:'2',name:'manage', Link:'/dashboard/position/manage',
},
{
  id:'3', name: 'Update',Link:'/dashboard/position/update'
},
]
}
