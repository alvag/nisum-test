import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RegisterUserForm, User } from '@/core/models';
import { CardComponent } from '@/shared/components';
import { NotificationService, RegisterUserService } from '@/core/services';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
export class RegisterPageComponent {
  private readonly registerUserService = inject( RegisterUserService );
  private readonly notificationService = inject( NotificationService );

  registerForm: FormGroup<RegisterUserForm> = new FormGroup( new RegisterUserForm() );
  isLoading = signal( false );

  onSubmit() {
    const { confirmPassword, ...userData } = this.registerForm.value;

    // Verificamos si existe el usuario
    const existingUser = this.registerUserService.getUserByEmail( userData.email ?? '' );

    if ( existingUser ) {
      this.notificationService.error( 'El email ya está registrado' );
      return;
    }

    // Procedemos con el registro
    this.isLoading.set( true );
    this.registerUserService.addUser( userData as User )
    .subscribe( {
      next: () => {
        this.notificationService.success( 'Usuario registrado exitosamente' );
        this.registerForm.reset();
      },
      error: ( error ) => {
        this.notificationService.error( 'Error al registrar usuario:', error );
      },
      complete: () => {
        this.isLoading.set( false );
      }
    } );
  }
}
