import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent {

  @Input('form-control') formControl: FormControl = new FormControl();

  public get errorMessage(): string | null {
    if (this.hasError()) {
      return this.getErrorMessage();
    }
    else
      return null;
  }

  private hasError(): boolean {
    return (this.formControl.invalid && this.formControl.touched)
  }

  private getErrorMessage(): string | null {
    const inputError = this.formControl.errors;
    if (inputError?.['required'])
      return 'Dado obrigatório'
    else if (inputError?.['minlength']) {
      const requiredLength = inputError?.['minlength'].requiredLength;
      return `Deve ter no mínimo ${requiredLength} caracteres`;
    }
    else if (inputError?.['maxlength']) {
      const requiredLength = inputError?.['maxlength'].requiredLength;
      return `Deve ter no máximo ${requiredLength} caracteres`;
    }
    else if (inputError?.['email'])
      return 'Formato de e-mail é inválido'
    else
      return null;
  }
}
