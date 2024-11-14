import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { PersonsTableComponent } from '@/pages/dashboard/components/persons/persons-table/persons-table.component';
import { PersonsCustomTableComponent } from '@/pages/dashboard/components/persons/custom-persons-table/custom-persons-table.component';

@Component( {
  selector: 'app-persons-list',
  standalone: true,
  imports: [
    MatButton,
    MatTabGroup,
    MatTab,
    PersonsTableComponent,
    PersonsCustomTableComponent
  ],
  templateUrl: './persons-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class PersonsListComponent {

}
