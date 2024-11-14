import { FormControl, Validators } from '@angular/forms';

export class LoginUserForm {
  email: FormControl<string | null> = new FormControl<string | null>( null, [Validators.required, Validators.email] );
  password: FormControl<string | null> = new FormControl<string | null>( null, [Validators.required] );
}

export type LoginUser = {
  [K in keyof LoginUserForm]: LoginUserForm[K] extends FormControl<infer T> ? T : never;
}
