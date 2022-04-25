import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Orders } from '../model/Orders/Orders';
import { Sellers } from '../model/Sellers/Sellers';
import { OrdersService } from '../services/orders/orders.service';
import { SellersService } from '../services/sellers/sellers.service';
import { SweetAlert } from '../SweetAlert';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  public orderForm!: FormGroup;

  private orderInsertSubscription!: Subscription;
  private orderGetByIdSubscription!: Subscription;
  private orderUpdateSubscription!: Subscription;
  private sellersGetAllSubscription!: Subscription;

  public order: Orders = new Orders();
  public sellers: Sellers[] = [];

  public edit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private sellersService: SellersService,
    public sweetAlert: SweetAlert,
    @Inject(MAT_DIALOG_DATA) public data: {orderId: number}
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      product: [null, Validators.required],
      sellerId: [null, Validators.required],
      country: [null, [Validators.required, Validators.maxLength(3)]],
      price: [null, Validators.required]
    });

    if(this.data.orderId != null || this.data.orderId != undefined) {
      this.getOrderByID();
      this.edit = true;
    }

    this.getAllSellers();
  }

  public getOrderByID() {
    if(this.orderGetByIdSubscription)
      this.orderGetByIdSubscription.unsubscribe();

    this.orderGetByIdSubscription = this.ordersService.getOrderById(this.data.orderId).subscribe((res: any) => {
      this.order = res;

      this.orderForm.get('product')?.setValue(res.product);
      this.orderForm.get('sellerId')?.setValue(res.sellerId);
      this.orderForm.get('country')?.setValue(res.country);
      this.orderForm.get('price')?.setValue(res.price);
    },
    error => {
      this.sweetAlert.ShowAlert("Error!", "An error had occur! Try again later", "error");
      this.dialogRef.close();
    })
  }

  public getAllSellers() {
    if(this.sellersGetAllSubscription)
      this.sellersGetAllSubscription.unsubscribe();

    this.sellersGetAllSubscription = this.sellersService.getSellers().subscribe((res: any) => {
      this.sellers = res;
    },
    error => {
      this.sweetAlert.ShowAlert('Error!', "An error had occur trying to get the sellers. Please try again later", "error");
    })
  }

  public closeModal() {
    this.dialogRef.close();
  }

  public validFields(field: string) {
    if(this.orderForm.get(field))
      return this.orderForm.get(field)?.errors && (this.orderForm.get(field)?.dirty || this.orderForm.get(field)?.touched);
    return;
  }

  private insertOrder() {
    this.order.orderId = 0;
    this.order.product = this.orderForm.get('product')?.value;
    this.order.seller = this.orderForm.get('sellerId')?.value;
    this.order.country = this.orderForm.get('country')?.value.toUpperCase();
    this.order.price = this.orderForm.get('price')?.value;

    if(this.orderInsertSubscription)
      this.orderInsertSubscription.unsubscribe();

    this.orderInsertSubscription = this.ordersService.saveOrder(this.order).subscribe(response => {
      this.sweetAlert.ShowAlert("Success!", "The order has been created", "success");
      this.dialogRef.close();
    },
    error => {
      this.sweetAlert.ShowAlert("Error!", "Some error had occur, try again later!", "error");
    });
  }

  private updateOrder() {
    this.order.product = this.orderForm.get('product')?.value;
    this.order.seller = this.orderForm.get('sellerId')?.value;
    this.order.country = this.orderForm.get('country')?.value.toUpperCase();
    this.order.price = this.orderForm.get('price')?.value;

    if(this.orderUpdateSubscription)
      this.orderUpdateSubscription.unsubscribe();

    this.orderUpdateSubscription = this.ordersService.updateOrder(this.order.orderId, this.order).subscribe((res: any) => {
      this.sweetAlert.ShowAlert('Sucess!', 'The order has been updated', 'success');
      this.dialogRef.close();
    },
    error => {
      this.sweetAlert.ShowAlert('Error!', "The order hasn't been updated. Please try again", 'error');
    })
  }

  public deleteOrder() {
    this.ordersService.deleteOrder(this.data.orderId).subscribe((res: any) => {
      this.sweetAlert.ShowAlert("Success!", "The order has been deleted", "success");
      this.dialogRef.close();
    },
    error => {
      this.sweetAlert.ShowAlert("Error!", "The order hasn't been deleted. Please try again later!", "error");
    })
  }

  public saveOrder() {
    if(this.edit) {
      this.updateOrder();
    } else {
      this.insertOrder();
    }
  }

  ngOnDestroy(): void {
    if(this.orderInsertSubscription)
      this.orderInsertSubscription.unsubscribe();

    if(this.orderGetByIdSubscription)
      this.orderGetByIdSubscription.unsubscribe();

    if(this.orderUpdateSubscription)
      this.orderUpdateSubscription.unsubscribe();

    if(this.sellersGetAllSubscription)
      this.sellersGetAllSubscription.unsubscribe();
  }
}
