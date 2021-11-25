import { Component, OnInit } from '@angular/core';
import { CodePromotionRequestCreate } from '../models/code-promotion-request-create.model';
import { CodePromotionRequestRedeemed } from '../models/code-promotion-request-redeemed.model';
import { CodePromotionResponse } from '../models/code-promotion-response.model';
import { CodePromotionService } from '../services/code-promotion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-management',
  templateUrl: './code-management.component.html',
  styleUrls: ['./code-management.component.scss'],
})
export class CodeManagementComponent implements OnInit {
  codePromotionCreate: CodePromotionRequestCreate =
    new CodePromotionRequestCreate();
  codePromotionRedeemed: CodePromotionRequestRedeemed =
    new CodePromotionRequestRedeemed();

  isSaving = false;
  codePromotions: CodePromotionResponse[] = [];
  constructor(private _codePromotionService: CodePromotionService) {}

  ngOnInit(): void {
    this.getCodePromotions();
  }

  getCodePromotions() {
    this._codePromotionService.getAll().subscribe((data) => {
      this.codePromotions = data;
    });
  }
  createCodePromotions() {
    if (this.codePromotionCreate.name.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Ingrese un nombre correcto',
      });
      return;
    }
    if (this.codePromotionCreate.mail.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Ingrese un email correcto',
      });
      return;
    }
    this.isSaving = true;
    this._codePromotionService
      .createCodePromotion(this.codePromotionCreate)
      .subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Listo',
          text: 'El codigo se genero correctamente',
        });
        document.getElementById('btnCerrarModal1')?.click();
        this.codePromotionCreate = new CodePromotionRequestCreate();
        this.getCodePromotions();
      })
      .add(() => {
        this.isSaving = false;
      });
  }
  redeemCode() {
    if (this.codePromotionRedeemed.code.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'Ingrese un codigo',
      });
      return;
    }
    this.isSaving = true;

    this._codePromotionService
      .redeemCode(this.codePromotionRedeemed)
      .subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Listo',
          text: 'El codigo se canjeo correctamente',
        });
        document.getElementById('btnCerrarModal2')?.click();
        this.codePromotionRedeemed = new CodePromotionRequestRedeemed();
        this.getCodePromotions();
      })
      .add(() => {
        this.isSaving = false;
      });
  }
}
