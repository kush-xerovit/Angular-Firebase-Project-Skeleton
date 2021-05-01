import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup } from '@angular/forms'
// import { ITopic } from 'src/app/pages/admin-pages/topic/topic.model'
// import { TopicService } from 'src/app/pages/admin-pages/topic/topic.service'
import { DynamicFieldModel } from '../dynamic-field.model'

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements OnInit {
  @Input()
  formGroup: FormGroup

  @Input()
  field: DynamicFieldModel
  // // topic data
  // topicData: Array<ITopic>
  // subTopicData = []
  @Output() output = new EventEmitter<Array<string>>()
  constructor() {}

  ngOnInit(): void {}

  // get sub topic data
  async onChange(event) {
    // this.subTopicData = []
    // event.forEach((topic) => {
    //   this.topicService.getTopic(topic.id).subscribe((data) => {
    //     const subData = data.sub_topic
    //     subData.forEach((sub) => {
    //       this.subTopicData.push({ value: sub, text: sub.name })
    //     })
    //     this.output.next(this.subTopicData)
    //   })
    // })
  }
}
