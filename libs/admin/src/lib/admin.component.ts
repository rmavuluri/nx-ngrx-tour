import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PoiActions, PoiEntity, PoiSelectors } from '@packt/poi';
import { Subscription } from 'rxjs';
// import {  } from 'ng2-charts';
import { AdminService } from './admin.service';
@Component({
  selector: 'nx-ngrx-tour-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  data: number[] = [];
  //labels: Label[] = [];

  constructor(private store: Store, private adminService: AdminService) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(PoiSelectors.getAllPoi)
      .subscribe((pois) => {
        this.buildChart(pois);
      });
    this.store.dispatch(PoiActions.init());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private buildChart(pois: PoiEntity[]) {
    //this.labels = pois.map((poi) => poi.name);
    this.data = this.adminService.getStatistics(pois);
  }
}
