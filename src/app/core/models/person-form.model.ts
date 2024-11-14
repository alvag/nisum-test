import { FormControl, Validators } from '@angular/forms';

export class PersonForm {
  id: FormControl<number | null> = new FormControl( null );
  email: FormControl<string | null> = new FormControl( null, [ Validators.required, Validators.email ] );
  first_name: FormControl<string | null> = new FormControl( null, [ Validators.required ] );
  last_name: FormControl<string | null> = new FormControl( null, [ Validators.required ] );
  startDate: FormControl<Date | null> = new FormControl( null );
  endDate: FormControl<Date | null> = new FormControl( null );
}
