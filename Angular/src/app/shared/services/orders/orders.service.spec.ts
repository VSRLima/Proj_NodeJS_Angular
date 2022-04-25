import { TestBed, tick, inject } from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

import { OrdersService } from './orders.service';
import { Orders } from '../../model/Orders/Orders';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrders', () => {
    it('should return a collection of orders', () => {
        const ordersResponse: Orders[] = [
          {
            orderId: 1,
            product: "Smartphone #3",
            seller: 3,
            country: "BRA",
            price: 2399
          },
          {
            orderId: 2019060025,
            product: "Laptop #3",
            seller: 1,
            country: "BRA",
            price: 1900
          }
        ];

        let response: Orders[] = [];

        spyOn(service, 'getOrders').and.returnValue(of(ordersResponse));

        service.getOrders().subscribe((res: any) => {
          response = res;
        });

        expect(response).toEqual(ordersResponse);
    });
  });

  describe('getOrderById', () => {
    it('should return a single order', () => {
      const ordersResponse: Orders = {
        orderId: 2019060025,
        product: "Laptop #3",
        seller: 1,
        country: "BRA",
        price: 1900
      };

      let response;

      spyOn(service, 'getOrderById').and.returnValue(of(ordersResponse));

      service.getOrderById(2019060025).subscribe((res: Orders) => {
        response = res;
      });

      expect<any>(response).toEqual(ordersResponse);
    });
  });

  describe('saveOrder', () => {
    it('should save a new Order', () => {
      const postOrder: Orders = {
        orderId: 0,
        product: "Laptop #5",
        seller: 1,
        country: "BRA",
        price: 1901
      };

      service.saveOrder(postOrder).subscribe((res: any) => {
        expect(res).toEqual(postOrder);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      request.flush(postOrder);
      httpMock.verify();
    });
  });

  describe('deleteOrder', () => {
    it('shoud delete a order', () => {
      const deleteOrder: Orders = {
        orderId: 2019060025,
        product: "Laptop #3",
        seller: 1,
        country: "BRA",
        price: 1900
      };

      service.deleteOrder(2019060025).subscribe((res: any) => {
          expect(res).toBe(deleteOrder);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });

      request.flush(deleteOrder);
      httpMock.verify();
    })
  });

  describe('updateOrder', () => {
    it('should update a order', () => {
      const updateOrder: Orders = {
        orderId: 2019060025,
        product: "Laptop #4",
        seller: 1,
        country: "BRA",
        price: 1901
      }

      service.updateOrder(2019060025, updateOrder).subscribe((res: any) => {
        expect(res).toBe(updateOrder);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'PUT';
      });

      request.flush(updateOrder);
      httpMock.verify();
    })
  })
});
