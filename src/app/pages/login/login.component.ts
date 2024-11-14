import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CardComponent } from '@/shared/components';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { LoginService, NotificationService } from '@/core/services';
import { LoginUser, LoginUserForm } from '@/core/models';
import { MatButton } from '@angular/material/button';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component( {
  selector: 'app-login',
  standalone: true,
  imports: [
    CardComponent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatProgressSpinner,
    RouterLink,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class LoginPageComponent {
  private readonly destroyRef = inject( DestroyRef );
  private readonly loginService = inject( LoginService );
  private readonly notificationService = inject( NotificationService );
  private readonly router = inject( Router );

  loginForm: FormGroup<LoginUserForm> = new FormGroup( new LoginUserForm() );
  isLoading = signal( false );

  onSubmit(): void {
    this.isLoading.set( true );

    this.loginService.login( this.loginForm.value as LoginUser )
    .pipe(
      finalize( () => this.isLoading.set( false ) ),
      takeUntilDestroyed( this.destroyRef )
    )
    .subscribe( {
      next: () => {
        this.router.navigate( ['/dashboard'] );
      },
      error: ( error ) => {
        this.notificationService.error( error.message );
      }
    } );
  }
}
