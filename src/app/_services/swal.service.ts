import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  successSwal(title: string) {
    return Swal.fire({
      icon: 'success',
      title: `${title}`,
      buttonsStyling: true,
      customClass: {
        popup: 'modal-box',
        title:
          'text-2xl font-bold font-poppins text-neutral text-center leading-relaxed',
        htmlContainer: '!px-0 !m-0 !py-4 !font-normal !text-left text-sm',
        actions: 'flex justify-end w-full px-10',
        confirmButton: 'w-auto rounded shadow px-3 py-2 text-sm transition-all',
      },
      confirmButtonText: 'Close',
    });
  }

  infoSwal(title: string) {
    return Swal.fire({
      icon: 'info',
      title: `${title}`,
      buttonsStyling: true,
      customClass: {
        popup: 'modal-box',
        title:
          'text-2xl font-bold font-poppins text-neutral text-center leading-relaxed',
        htmlContainer: '!px-0 !m-0 !py-4 !font-normal !text-left text-sm',
        actions: 'flex justify-end w-full px-10',
        confirmButton: 'w-auto rounded shadow px-3 py-2 text-sm transition-all',
      },
      confirmButtonText: 'Close',
    });
  }

  errorSwal(title: string) {
    return Swal.fire({
      icon: 'error',
      title: `${title}`,
      buttonsStyling: true,
      customClass: {
        popup: 'modal-box',
        title:
          'text-2xl font-bold font-poppins text-neutral text-center leading-relaxed',
        htmlContainer: '!px-0 !m-0 !py-4 !font-normal !text-left text-sm',
        actions: 'flex justify-end w-full px-10',
        confirmButton: 'w-auto rounded shadow px-3 py-2 text-sm transition-all',
      },
      confirmButtonText: 'Close',
    });
  }

  swalWithDialog(title: string) {
    return Swal.fire({
      title: `${title}`,
      icon: 'question',
      buttonsStyling: true,
      customClass: {
        popup: 'modal-box',
        title:
          'text-2xl font-bold font-poppins text-neutral text-center leading-relaxed',
        htmlContainer: '!px-0 !m-0 !py-4 !font-normal !text-left text-sm',
        actions: 'flex justify-end w-full px-10',
        confirmButton: 'w-auto rounded shadow px-3 py-2 text-sm',
        cancelButton: 'w-auto rounded shadow px-3 py-2 text-sm',
      },
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',
    });
  }
}
