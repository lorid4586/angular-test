import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicFormComponent } from './my-form/dynamic-form/dynamic-form.component';
import { FormFieldComponent } from './my-form/form-field/form-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectFormComponent } from './select-form/select-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    FormFieldComponent,
    SelectFormComponent,
    DynamicFormComponent,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
