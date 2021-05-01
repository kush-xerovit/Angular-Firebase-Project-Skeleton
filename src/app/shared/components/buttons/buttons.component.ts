import { Component } from '@angular/core'

@Component({
  selector: 'app-add-button',
  template:
    '<button  class="btn btn-icon btn-3 btn-primary text-capitalize border-0" type="button"><span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span> <span class="btn-inner--text">Add New</span></button>',
})
export class AddButtonComponent {}

@Component({
  selector: 'app-save-button',
  template:
    '<button class="btn btn-primary text-capitalize border-0" type="button">Save</button>',
})
export class AddSaveComponent {}

@Component({
  selector: 'app-update-button',
  template:
    '<button class="btn btn-primary text-capitalize border-0" type="button">Update</button>',
})
export class AddUpdateComponent {}
@Component({
  selector: 'app-link-add-button',
  template: '<a href="javascript:void(0)" class="text-dark mr-2">Add</a>',
})
export class AddLinkAddComponent {}
@Component({
  selector: 'app-link-edit-button',
  template: '<a href="javascript:void(0)" class="text-info mr-2">Edit</a>',
})
export class AddLinkEditComponent {}

@Component({
  selector: 'app-link-delete-button',
  template: '<a href="javascript:void(0)" class="text-danger">Delete</a>',
})
export class AddLinkDeleteComponent {}

@Component({
  selector: 'app-link-save-button',
  template: '<a href="javascript:void(0)" class="primary-color  mr-2">Save</a>',
})
export class AddLinkSaveComponent {}

@Component({
  selector: 'app-link-cancel-button',
  template: '<a href="javascript:void(0)" class="secondary-color">Cancel</a>',
})
export class AddLinkCancelComponent {}

// @Component({
//   selector: 'app-cancel-button',
//   template:
//     '<button type="button" class="btn btn-outline-secondary mr-auto text-capitalize" > Cancel </button>',
// })
// export class CancelButtonComponent {}
