import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sellers } from 'src/app/shared/model/Sellers/Sellers';
import { SellersService } from 'src/app/shared/services/sellers/sellers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert } from 'src/app/shared/SweetAlert';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit, OnDestroy {
  public sellersForm!: FormGroup;

  private sellersGetByIdSubscription!: Subscription;
  private sellersInsertSubscription!: Subscription;
  private sellersUpdateSubscription!: Subscription;

  public edit!: boolean;

  public sellers: Sellers = new Sellers();

  constructor(
    public formBuilder: FormBuilder,
    public sellersService: SellersService,
    public router: Router,
    protected route: ActivatedRoute,
    public sweetAlert: SweetAlert
  ) { }

  ngOnInit(): void {
    this.sellersForm = this.formBuilder.group({
      name: [null, Validators.required]
    });

    const param: any = this.route.snapshot.paramMap.get('id');

    if(param == null || param == 0) {
      this.edit = false
    } else {
      if(this.sellersGetByIdSubscription)
        this.sellersGetByIdSubscription.unsubscribe();

      this.sellersGetByIdSubscription = this.sellersService.getSellerById(param).subscribe((res: any) => {
        this.sellers = res;

        this.sellersForm.get('name')?.setValue(res.name);
      },
      error => {
        this.sweetAlert.ShowAlert('Error!', 'Seller not found', 'error');
        this.router.navigate(['']);
      })
    }
  }

  private insertSeller() {
    this.sellers.id = 0,
    this.sellers.name = this.sellersForm.get('name')?.value;

    if(this.sellersInsertSubscription)
      this.sellersInsertSubscription.unsubscribe();

    this.sellersInsertSubscription = this.sellersService.saveSeller(this.sellers).subscribe((res: any) => {
      this.sweetAlert.ShowAlert('Success!', 'The seller has been created', 'success');
      this.router.navigate(['']);
    },
    error => {
      this.sweetAlert.ShowAlert('Error!', "The seller hasn't been created. Please try again!", "error");
    })
  }

  private updateSeller() {
    this.sellers.name = this.sellersForm.get('name')?.value;

    if(this.sellersUpdateSubscription)
      this.sellersUpdateSubscription.unsubscribe();

    this.sellersUpdateSubscription = this.sellersService.updateSeller(this.sellers.id, this.sellers).subscribe((res: any) => {
      this.sweetAlert.ShowAlert('Success!', 'The seller has been updated!', 'success');
      this.router.navigate(['']);
    },
    error => {
      this.sweetAlert.ShowAlert('Error!', "The seller hasn't been updated. Please try again", 'error');
    })
  }

  public saveSeller() {
    if(this.edit) {
      this.updateSeller();
    } else {
      this.insertSeller();
    }
  }

  public validFields(field: string) {
    if(this.sellersForm.get(field))
      return this.sellersForm.get(field)?.errors && (this.sellersForm.get(field)?.dirty || this.sellersForm.get(field)?.touched);

    return false;
  }

  public goToHome() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    if(this.sellersGetByIdSubscription)
      this.sellersGetByIdSubscription.unsubscribe();

    if(this.sellersInsertSubscription)
      this.sellersInsertSubscription.unsubscribe();

    if(this.sellersUpdateSubscription)
      this.sellersUpdateSubscription.unsubscribe();
  }
}
