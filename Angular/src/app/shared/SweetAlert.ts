import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class SweetAlert {
  constructor() {}

  public ShowAlert(
    title: string,
    text: string,
    icon: 'success' | 'warning' | 'info' | 'error',
    autoClose = 0
  ) {
    Swal.fire({
      title,
      html: text,
      icon,
      showConfirmButton: true,
      confirmButtonText: 'OK',
    });

    if(autoClose > 0){
      setTimeout((e: any) =>{
        Swal.close();
      },autoClose)
    }
  }

  public ShowConfirm(
    title: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText: string,
    confirmFunction: Function,
    cancelFunction: Function
  ) {
    if (!title) {
        title = 'Confirmar';
    }

    if (!text) {
        text = 'Deseja continuar?';
    }

    if (!confirmButtonText) {
        confirmButtonText = 'OK';
    }

    if (!cancelButtonText) {
        cancelButtonText = 'Cancelar';
    }

    Swal.fire({
        title,
        html: text,
        icon: 'question',
        showConfirmButton: true,
        confirmButtonText,
        showCancelButton: true,
        cancelButtonText,
    }).then((willDelete) => {
        if (willDelete.value) {
            confirmFunction();
        } else {
            if (cancelFunction) {
                cancelFunction();
            } else {
                Swal.close();
            }
        }
    });
  }
}
