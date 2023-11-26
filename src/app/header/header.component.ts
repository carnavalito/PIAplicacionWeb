import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, NavigationStart, Router, Routes} from "@angular/router";

class NavigationEvent {
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  counter: number;
  dontShowHeader: boolean;
  event$

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // this.dontShowHeader = this.router.url.startsWith('/login');

    this.event$
      = this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
            if(event.url == "/login" || event.url == "/"){
              this.dontShowHeader = true
            }else {
              this.dontShowHeader = false
            }
          }
        });
  }

  headerUrls = [{name: 'home', url: ''}, {name: 'peliculas', url: 'movie'}];

  logout() {
    this.authService.logout().subscribe(response => {
      console.log(response);
      localStorage.clear()
      this.router.navigateByUrl("/login");

    })
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }
}
