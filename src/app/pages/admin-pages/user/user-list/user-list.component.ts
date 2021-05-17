import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any;
  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    // this.userService.getUsers().subscribe(data => {
    //   this.users = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       name: e.payload.doc.get('name')
    //     } as User;
    //   })
    // });
    this.users = await this.userService.getAll();
    console.log(this.users)

  }

  goTo() {
    this.router.navigateByUrl('admin/user-form')
  }

  update(id) {
    this.router.navigate([`admin/user-form`], {
      queryParams: { id },
    });
  }

  async delete(id: string) {
    this.userService.delete(id);
    this.users = await this.userService.getAll();
  }

}
