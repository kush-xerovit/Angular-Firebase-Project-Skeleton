import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../login/profile.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile: any;
  constructor(private profileService: ProfileService, private router: Router) { }

  async ngOnInit() {
    // this.profileService.getProfiles().subscribe(data => {

    //   this.profile = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       name: e.payload.doc.get('name')
    //     };

    //   })
    // });
    this.profile = await this.profileService.getAll();
    console.log(this.profile)

  }

  goTo() {
    this.router.navigateByUrl('login')
  }

  update(id) {
    this.router.navigate([`login`], {
      queryParams: { id },
    });
  }

  delete(id: string) {
    this.profileService.delete(id);
  }

}
