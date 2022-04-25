import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Sellers } from '../../model/Sellers/Sellers';
import { of } from 'rxjs';

import { SellersService } from './sellers.service';

describe('SellersService', () => {
  let service: SellersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SellersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSellers', () => {
    it('should return a collection of sellers', () => {
      const sellersResponse: Sellers[] = [
        {
          "name": "Seller #1",
          "id": 1
        },
        {
          "name": "Seller #2",
          "id": 2
        },
      ];

      let response: Sellers[] = [];

      spyOn(service, 'getSellers').and.returnValue(of(sellersResponse));

      service.getSellers().subscribe((res: Sellers[]) => {
        response = res;
      });

      expect(response).toEqual(sellersResponse);
    });
  });

  describe('getSellerById', () => {
    it('should return a single Seller', () => {
      const sellerResponse: Sellers = {
        name: "Seller #1",
        id: 1
      };

      let response;

      spyOn(service, 'getSellerById').and.returnValue(of(sellerResponse));

      service.getSellerById(1).subscribe((res: Sellers) => {
        response = res;
      });

      expect<any>(response).toEqual(sellerResponse);
    });
  });

  describe('saveSeller', () => {
    it('should save a new Seller', () => {
      const sellerResponse: Sellers = {
        name: "Seller #6",
        id: 0
      };

      service.saveSeller(sellerResponse).subscribe((res: any) => {
        expect(res).toEqual(sellerResponse);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });

      request.flush(sellerResponse);
      httpMock.verify();
    });
  });

  describe('deleteSeller', () => {
    it('should delete a seller', () => {
      const sellerResponse: Sellers = {
        name: "Seller #1",
        id: 1
      };

      service.deleteSeller(1).subscribe((res: any) => {
        expect(res).toBe(sellerResponse);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'DELETE';
      });

      request.flush(sellerResponse);
      httpMock.verify();
    });
  });

  describe('updateOrder', () => {
    it('should update a seller', () => {
      const sellerResponse: Sellers = {
        name: "Seller #10",
        id: 1
      };

      service.updateSeller(1, sellerResponse).subscribe((res: any) => {
        expect(res).toBe(sellerResponse);
      });

      const request = httpMock.expectOne((req) => {
        return req.method === 'PUT';
      });

      request.flush(sellerResponse);
      httpMock.verify();
    });
  })
});
