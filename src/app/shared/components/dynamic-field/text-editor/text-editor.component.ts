import { Component, OnInit, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
})
export class TextEditorComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['link'], // link and image, video
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      // [
      //   { list: 'ordered' },
      //   { list: 'bullet' },
      //   { indent: '-1' },
      //   { indent: '+1' },
      // ],  outdent/indent
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ direction: 'rtl' }, { align: [] }], text direction
      // [{ font: [] }],
      // [{ size: ['small', false, 'large', 'huge'] }], custom dropdown
      // [{ header: [1, 2, 3, 4, 5, 6, false] }]
      // [{ color: [] }, { background: [] }],  dropdown with defaults from theme
      // ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video'], link and image, video
    ],
  }

  constructor() {}

  ngOnInit() {}
}
