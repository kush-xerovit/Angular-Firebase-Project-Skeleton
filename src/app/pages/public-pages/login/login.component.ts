import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms'
import { DynamicFieldModel } from 'src/app/shared/components/dynamic-field'
import { FormService } from 'src/app/shared/services/form/form.service'
import { ProfileService } from './profile.service';

import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  id: any
  profile: any
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
    {
      label: 'Email',
      name: 'email',
      type: 'input',
      placeholder: 'jon.snow@email.com',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please enter email',
        },
        {
          name: 'email',
          validator: Validators.email,
          message: 'Email must be a valid email address',
        },
      ],
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'input',
      placeholder: '09123456789',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please enter phone',
        },
        {
          name: 'phoneValid',
          validator: 'phoneValidator',
          message: 'Invalid phone number',
        },
      ],
    },
    {
      label: 'NRC',
      name: 'nrc',
      type: 'input',
      placeholder: '12/OUKAMA(N)123456',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please enter nrc',
        },
        {
          name: 'nrcValid',
          validator: 'nrcValidator',
          message: 'Invalid nrc',
        },
      ],
    },
    {
      label: 'Favourite Frontend Language',
      name: 'language',
      type: 'radio',
      value: 'Angular',
      options: [
        { value: 'Angular', text: 'Angular' },
        { value: 'React', text: 'React' },
        { value: 'Vuejs', text: 'Vuejs' },
      ],
    },
    {
      label: 'Type Script',
      name: 'script',
      type: 'checkbox',
      value: '',
      options: [{ value: 'Type Script', text: 'Type Script' }],
    },
    {
      label: 'Vanilla Script',
      name: 'vanilla',
      type: 'checkbox',
      value: '',
      options: [{ value: 'Vanilla Script', text: 'Vanilla Script' }],
    },
    {
      label: 'Remarks',
      name: 'remarks',
      type: 'textarea',
      placeholder: 'enter short description',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please enter remarks',
        },
      ],
    },
    {
      label: 'Favourite Backend Language',
      name: 'backend',
      type: 'select',
      placeholder: 'PHP',
      multiple: true,
      options: [
        { value: 'PHP', text: 'PHP' },
        { value: 'Nodejs', text: 'Nodejs' },
        { value: 'Java', text: 'Java' },
      ],
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'please select backend language',
        },
      ],
    },
    {
      label: 'Current Date',
      name: 'scheduledTime',
      type: 'date',
      placeholder: 'current date',
      class: 'col-md-6',
      showPicker: true,
      minDate: moment().toDate(),
    },
    {
      label: 'Description',
      name: 'description',
      type: 'texteditor',
      placeholder: 'Description',
      validations: [
        {
          name: 'required',
          validator: Validators.required,
          message: 'Please enter description',
        },
      ],
    },
    {
      label: 'Tag chip',
      name: 'label',
      type: 'taginput',
    },
    {
      label: 'Rating',
      name: 'rating',
      type: 'ratinginput',
    }
  ]
  constructor(
    private formService: FormService,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formService.buildForm(this.fieldConfigs)
    this.route.queryParams.subscribe(async params => {
      if (params["id"]) {
        this.id = params["id"]
        let record = await this.profileService.getProfile(`profile/${this.id}`)
        record['scheduledTime'] = new Date(record['scheduledTime'].seconds * 1000)
        this.form.patchValue(record)
        console.log(record)
      }
    });
  }


  onSubmit() {
    if (this.form.invalid)
      return this.formService.validateAllFormFields(this.form)
    console.log(this.form.value)
    this.profileService.saveData(this.id, this.form.value)
    this.router.navigate(['/'])
  }

}
