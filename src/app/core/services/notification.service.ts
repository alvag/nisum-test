import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable( {
  providedIn: 'root'
} )
export class NotificationService {

  private readonly snackBar = inject( MatSnackBar );

  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  success( message: string, action: string = 'Cerrar' ) {
    this.snackBar.open( message, action, {
      ...this.defaultConfig,
      panelClass: ['success-alert']
    } );
  }

  error( message: string, action: string = 'Cerrar' ) {
    this.snackBar.open( message, action, {
      ...this.defaultConfig,
      panelClass: ['error-alert']
    } );
  }
}
