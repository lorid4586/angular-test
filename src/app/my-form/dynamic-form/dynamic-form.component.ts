import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
  @Input() jsonData: any;
  form: FormGroup = new FormGroup("");
  /**
   * format of questions:
   * {
   *  type: 'group' | 'input' | 'select' | 'checkbox' | 'radio',
   *  key: string
   *  value: string | number | boolean | any[]
   * }
   */
  questions: any = {
    level: 0
  };

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      console.log('form value changes: ', value);
    });
  }
  ngOnChanges() {
    if(this.jsonData && Object.keys(this.jsonData).length > 0) {
      this.form = this.setupControl(new FormGroup({}), null, this.jsonData, this.questions);
    };
  }

  setupControl(formGroup: FormGroup, key: string | null, jsonData: any, question: any): FormGroup {
    question.key = key;
    if(question.key === 'tools') {
      console.log("======" + jsonData);
    }
    if(typeof jsonData === 'object' && jsonData !== null) {
      const isArray = Array.isArray(jsonData);
      if(!isArray || jsonData.length > 0 && typeof jsonData[0] === 'object') {
        question.type = 'group';
        question.value = [];
        let group: FormGroup = new FormGroup({});
        Object.keys(jsonData).forEach((subkey) => {
          // setup form control for each key in the object
          const value = jsonData[subkey];
          const childQuestion = {formGroup: group, level: question.level + 1, isArray: isArray};
          this.setupControl(group, subkey, value, childQuestion);
          question.value.push(childQuestion);
        });
        if(key === null) {
          formGroup = group;
        }
        else {
          formGroup.addControl(key, group);
        }
      }
      else if(jsonData.length > 0 && typeof(jsonData[0]) !== 'object') {
        formGroup.addControl(key!, new FormControl("", Validators.required));
        question.type = 'select';
        question.value = "";
        question.options = jsonData;

      }

    }
    if(typeof jsonData === 'number' || typeof jsonData === 'string') {
      formGroup.addControl(key!, new FormControl(jsonData, Validators.required));
      question.type = 'input';
      question.value = jsonData;
   }
   if(typeof jsonData === 'boolean') {
    formGroup.addControl(key!, new FormControl(jsonData, Validators.required));
    question.type = 'checkbox';
    question.value = jsonData;
 }
    return formGroup;
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
