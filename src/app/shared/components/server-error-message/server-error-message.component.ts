import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-error-message',
  templateUrl: './server-error-message.component.html',
  styleUrls: ['./server-error-message.component.scss']
})
export class ServerErrorMessageComponent {

  @Input('error-messae') serverErrorMessage: string[] = [];

}
