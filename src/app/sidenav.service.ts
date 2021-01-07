import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  showSideNav$: Subject<any> = new BehaviorSubject<any>(null);
  emitShowSideNav(value: any) {
    this.showSideNav$.next(value);
  }
  get showSideNav(): BehaviorSubject<any> {
    return (this.showSideNav$ as BehaviorSubject<any>);
  }

  constructor() { }
  private sidenav: MatDrawer;

  public setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}