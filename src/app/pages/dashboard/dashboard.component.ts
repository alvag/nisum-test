import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { CardComponent, SidebarComponent } from '@/shared/components';
import { UserService } from '@/core/services';
import { AsyncPipe } from '@angular/common';
import { UserStorage } from '@/core/utils/user-storage.utils';

@Component( {
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDivider,
    SidebarComponent,
    AsyncPipe,
    CardComponent
  ],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export default class DashboardComponent {
  private userService = inject( UserService );
  isSidebarOpen = false;
  user$ = this.userService.user$;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    UserStorage.signOut();
    window.location.href = '/login';
  }
}
