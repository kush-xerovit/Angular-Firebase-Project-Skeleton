import { Injectable } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  FormArray,
} from '@angular/forms'
import {
  DynamicFieldModel,
  Validator,
} from 'src/app/shared/components/dynamic-field'
import { ToastrService } from 'ngx-toastr'
import * as mmpn from 'myanmar-phonenumber'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { mimeType } from '../../components/dynamic-field/image-upload/mime-type.validator'

@Injectable()
export class FormService {
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  /**
   *
   * @param fieldConfigs // build FormGroup
   */

  buildForm(fieldConfigs: Array<DynamicFieldModel>): FormGroup {
    const formGroup = this.fb.group({})
    fieldConfigs.forEach((field) => {
      const control =
        field.type !== 'file' &&
        field.type !== 'formArray' &&
        field.type !== 'formArrayModal'
          ? this.fb.control(
              field.value,
              this.bindValidations(field.validations || []),
              field.type === 'image' ? mimeType : null
            )
          : this.fb.array([])
      formGroup.addControl(
        field.name,
        field.type !== 'formGroup' ? control : this.buildForm(field.formGroup)
      )
    })
    return formGroup
  }

  // /**
  //  *
  //  * @param form // nested formarray add in formGroup
  //  * @param data // parse data
  //  */

  // buildFormArray(form: Array<DynamicFieldModel>, data?: any): FormGroup {
  //   const form1: FormGroup = this.buildForm(form)
  //   form1.patchValue(data)
  //   const formArray = this.fildConfigFilterArray(form)
  //   if (formArray && formArray.length > 0)
  //     formArray.forEach((element) => {
  //       data[element.name].forEach((d) => {
  //         const form2: FormGroup = this.buildForm(element.formGroup)
  //         form2.patchValue(d)
  //         ;(<FormArray>form1.get(element.name)).push(form2)
  //       })
  //     })
  //   return form1
  // }

  /**
   *
   * @param validations Validation
   */

  bindValidations(validations: Array<Validator>) {
    if (validations.length > 0) {
      const validList = []
      validations.forEach((valid) => {
        if (valid.name === 'nrcValid' || valid.name === 'phoneValid')
          valid.validator =
            valid.name === 'nrcValid' ? this.nrcValidator : this.phoneValidator

        validList.push(valid.validator)
      })
      return Validators.compose(validList)
    }
    return null
  }

  /**
   *
   * @param control //Custom Validator
   */
  nrcValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const MMNRC = require('myanmar-nrc-x')
    if (control.value !== undefined && isNaN(control.value)) {
      try {
        const nrc = MMNRC(control.value)
        return null
      } catch (e) {
        return { nrcValid: true }
      }
    }
    return null
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (
      (control.value !== undefined && isNaN(control.value)) ||
      !mmpn.isValidMMPhoneNumber(control.value)
    ) {
      return { phoneValid: true }
    }
    return null
  }

  /**
   *
   * @param formGroup // form is invalid when submit
   */

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field)
      if (control instanceof FormArray) {
        for (const control1 of control.controls) {
          if (control1 instanceof FormControl) {
            control1.markAsTouched({
              onlySelf: true,
            })
          }
          if (control1 instanceof FormGroup) {
            this.validateAllFormFields(control1)
          }
        }
      }
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true,
        })
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }

  /**
   *
   * @param formArray // clear formArray in formGroup
   */
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  /**
   *
   * @param caption // title of the alert
   * @param desc // description of the alery
   */
  swalErrorAlert(caption: string, desc: string) {
    Swal.fire({
      icon: 'error',
      title: caption,
      text: desc,
    })
  }

  /**
   *
   * @param caption // title of the alert
   * @param desc // description of the alery
   */
  swalSuccessAlert(caption: string, desc: string) {
    Swal.fire({
      icon: 'success',
      title: caption,
      text: desc,
    })
  }

  // toastrCopiedAlert(content) {
  //   this.toastr.show(
  //     '<div class="alert-text">' + content + ' is copied to clipboard.</div>',
  //     '',
  //     {
  //       timeOut: 3000,
  //       enableHtml: true,
  //       tapToDismiss: false,
  //       titleClass: 'alert-title',
  //       positionClass: 'toast-top-center',
  //       toastClass: 'ngx-toastr alert alert-notify alert-dismissible',
  //     }
  //   )
  // }

  // /**
  //  *
  //  * add Form Group from modal component
  //  */

  // addFormGroup(item = {}): FormGroup {
  //   const formGroup = this.fb.group({})
  //   for (const key in item) {
  //     if (item.hasOwnProperty(key)) {
  //       formGroup.addControl(
  //         key,
  //         Array.isArray(item[key])
  //           ? this.fb.array([])
  //           : new FormControl(item[key])
  //       )
  //       if (Array.isArray(item[key]))
  //         item[key].forEach((element) => {
  //           const childFormGroup = this.fb.group({})
  //           for (const childKey in element) {
  //             childFormGroup.addControl(
  //               childKey,
  //               new FormControl(element[childKey])
  //             )
  //           }
  //           ;(<FormArray>formGroup.get(key)).push(childFormGroup)
  //         })
  //     }
  //   }
  //   return formGroup
  // }

  // /**
  //  *
  //  * @param fieldConfig // fiter formArray in fieldConfig
  //  */
  // fildConfigFilterArray(fieldConfig: Array<DynamicFieldModel>) {
  //   return fieldConfig.filter((s) => {
  //     return (
  //       s.type === 'formArray' ||
  //       s.type === 'formArrayModal' ||
  //       s.type === 'file'
  //     )
  //   })
  // }

  // /**
  //  *
  //  * @param fieldConfigs // fiter select in fieldConfig
  //  * @param data
  //  */
  // fileConfigFilterSelect(fieldConfigs, data) {
  //   fieldConfigs
  //     .filter((config) => config.type === 'select')
  //     .map((item) => {
  //       item.value = data[item.name]
  //     })
  // }

  /**
   *
   * change object from custom  object
   */
  // convertCustomToObject(data) {
  //   const object: any = {}
  //   for (const key in data) {
  //     if (data.hasOwnProperty(key)) object[key] = data[key]
  //   }
  //   return object
  // }

  // /**
  //  *
  //  * @param file // change format base64
  //  */
  // readFileBlob(file: File): Promise<any> {
  //   return new Promise((resolve, _) => {
  //     const reader = new FileReader()
  //     reader.onloadend = (e) => {
  //       resolve(reader.result)
  //     }
  //     reader.readAsDataURL(file)
  //   })
  // }
}
