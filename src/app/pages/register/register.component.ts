import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RegisterUserForm, User } from '@/core/models';
import { CardComponent } from '@/shared/components';
import { NotificationService, RegisterUserService } from '@/core/services';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component( {
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    RouterLink,
    MatLabel,
    MatError,

    CardComponent,
    MatProgressSpinner
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class RegisterPageComponent {
  private readonly destroyRef = inject( DestroyRef );
  private readonly registerUserService = inject( RegisterUserService );
  private readonly notificationService = inject( NotificationService );

  registerForm: FormGroup<RegisterUserForm> = new FormGroup( new RegisterUserForm() );
  isLoading = signal( false );

  onSubmit() {
    const { confirmPassword, ...userData } = this.registerForm.value;

    this.isLoading.set( true );
    this.registerUserService.addUser( userData as User )
    .pipe(
      takeUntilDestroyed( this.destroyRef ),
      finalize( () => this.isLoading.set( false ) )
    )
    .subscribe( {
      next: () => {
        this.notificationService.success( 'Usuario registrado exitosamente' );
        this.registerForm.reset();
      },
      error: ( error ) => {
        this.notificationService.error( error );
      }
    } );
  }
}
