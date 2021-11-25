import { Inject, Injectable } from '@angular/core';
import { CodePromotionRequestCreate } from '../models/code-promotion-request-create.model';
import { CodePromotionRequestRedeemed } from '../models/code-promotion-request-redeemed.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CodePromotionService {
  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get('/api/CodePromotion');
  }
  createCodePromotion(data: CodePromotionRequestCreate) {
    return this.api.post('/api/CodePromotion', data);
  }
  redeemCode(data: CodePromotionRequestRedeemed) {
    return this.api.post('/api/CodePromotion/RedeemedCodePromotion', data);
  }
}
