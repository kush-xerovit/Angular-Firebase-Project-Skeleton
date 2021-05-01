import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal'
import { Subscription } from 'rxjs'
import { ModalFormComponent } from 'src/app/shared/components/modal/modal-form/modal-form.component'
import { Validators } from '@angular/forms'
import { DynamicFieldModel } from 'src/app/shared/components/dynamic-field'
import { take } from 'rxjs/operators'
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  data:any;
  constructor(private route: ActivatedRoute,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params["data"]) {
        this.data = JSON.parse(params["data"])
        console.log(JSON.parse(params["data"]));
      }

    });
  }

}
