import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserStorage } from '@/core/utils/user-storage.utils';

@Component( {
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
} )
export class AppComponent implements OnInit {


  ngOnInit() {
    UserStorage.registerDefaultUser();
  }

}
