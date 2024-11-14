import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '@/core/services';
import { AsyncPipe } from '@angular/common';

@Component( {
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class HomeComponent {
  userService = inject( UserService );
}
