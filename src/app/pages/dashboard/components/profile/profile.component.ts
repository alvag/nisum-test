import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterUserForm } from '@/core/models';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { UserStorage } from '../../../../core/utils/user-storage.utils';
import { UserService } from '@/core/services';

@Component( {
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatError
  ],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class ProfileComponent implements OnInit {
  private readonly userService = inject( UserService );

  profileForm: FormGroup<RegisterUserForm> = new FormGroup( new RegisterUserForm() );
  user = UserStorage.getLoggedUser();

  ngOnInit() {
    this.profileForm.controls.password.setValidators( null );
    this.profileForm.controls.confirmPassword.setValidators( null );

    this.profileForm.patchValue( {
      name: this.user?.name,
      email: this.user?.email
    } );
  }

  onSubmit() {
    const { name, email, password } = this.profileForm.value;
    if ( this.user ) {
      this.user.email = email ?? null;
      this.user.name = name ?? null ;
      if ( password ) {
        this.user.password = password;
      }
      this.userService.updateUser( this.user );
    }
  }
}
