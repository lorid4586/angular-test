import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() question: any;

  ngOnInit() {

  }

  toInt(str: string) {
    return parseInt(str);
  }
}
