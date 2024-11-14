import { FormControl, Validators } from '@angular/forms';
import { CustomPerson } from '@/core/models/person.type';

export class PersonForm {
  id: FormControl<number | null>;
  email: FormControl<string | null>;
  first_name: FormControl<string | null>;
  last_name: FormControl<string | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;

  constructor( person?: CustomPerson ) {
    this.id = new FormControl( person?.id ?? null );
    this.email = new FormControl( person?.email ?? null, [ Validators.required, Validators.email ] );
    this.first_name = new FormControl( person?.first_name ?? null, [ Validators.required ] );
    this.last_name = new FormControl( person?.last_name ?? null, [ Validators.required ] );
    this.startDate = new FormControl( person?.startDate ?? null );
    this.endDate = new FormControl( person?.endDate ?? null );
  }
}
