import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DynamicFieldModel } from 'src/app/shared/components/dynamic-field'
import { FormService } from 'src/app/shared/services/form/form.service'

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form: FormGroup
  fieldConfigs: Array<DynamicFieldModel> = [
    {
      label: 'Name',
      name: 'name',
      type: 'input',
      placeholder: 'Jon Snow',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please enter name',
        },
      ],
    },
  ]

  id: any
  user: any
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private formService: FormService,) { }


  ngOnInit(): void {
    this.form = this.formService.buildForm(this.fieldConfigs)
    this.route.queryParams.subscribe(async params => {
      if (params["id"]) {
        this.id = params["id"]
        this.user = await this.userService.getUser(`users/${this.id}`);
        console.log(this.user)
        this.form.patchValue(this.user)
      }
    });

  }

  onClickSubmit() {
    this.userService.saveData(this.id, this.form.value)
    this.router.navigateByUrl('admin/user-list')
  }

  cancel() {
    this.router.navigateByUrl('admin/user-list')
  }

}
