import { FormControl, Validators } from '@angular/forms';

export class RegisterUserForm {
  id: FormControl<number | null> = new FormControl<number | null>( null );
  name: FormControl<string | null> = new FormControl<string | null>( null, Validators.required );
  email: FormControl<string | null> = new FormControl<string | null>( null, [Validators.required, Validators.email] );
  password: FormControl<string | null> = new FormControl<string | null>( null, [Validators.required, Validators.minLength( 6 )] );
  confirmPassword: FormControl<string | null> = new FormControl<string | null>( null, [Validators.required, Validators.minLength( 6 )] );
}

type RegisterUserFormType = {
  [K in keyof RegisterUserForm]: RegisterUserForm[K] extends FormControl<infer T> ? T : never;
};

export type User = Omit<RegisterUserFormType, 'confirmPassword'>;
