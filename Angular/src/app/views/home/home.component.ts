import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Orders } from 'src/app/shared/model/Orders/Orders';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { SellersService } from 'src/app/shared/services/sellers/sellers.service';
import { SweetAlert } from 'src/app/shared/SweetAlert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ["orderId", "product", "price", "seller", "country", "edit"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private getOrderSubscription!: Subscription;
  private topSellersSubscription!: Subscription;

  public dataSource!: any;
  public saveAll!: Orders[];

  loadingCard: boolean = false;

  public orders: Orders[] = [];
  public orderId!: number;
  public sellersWithPrice!: any;

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private sweetAlert: SweetAlert,
    public dialog: MatDialog,
    private sellersService: SellersService
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.topSellers();
  }

  public getOrders(): void {
    this.getOrderSubscription = this.ordersService.getOrders().subscribe((el: any) => {

      this.dataSource = new MatTableDataSource(el);
      this.dataSource.paginator = this.paginator;
    },
    error => {
      this.sweetAlert.ShowAlert("Error!", "An error had occur trying getting all orders! Please try again later!", "error");
    });
  }

  public showModalEdit(element?: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        orderId: element
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      this.getOrders();
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private topSellers() {
    this.topSellersSubscription = this.sellersService.topSellers().subscribe((res: any) => {
      this.sellersWithPrice = res[0];
    },
    error => {
      this.sweetAlert.ShowAlert("Error!", "An error occur while trying to calculate the top sellers. Please try again later", "error");
    })
  }

  ngOnDestroy(): void {
    if(this.getOrderSubscription)
      this.getOrderSubscription.unsubscribe();

    if(this.topSellersSubscription)
      this.topSellersSubscription.unsubscribe();
  }
}
