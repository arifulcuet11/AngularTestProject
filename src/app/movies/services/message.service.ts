import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  msgSave = 'Saved Successfully';
  msgUpdate = 'Updated Successfully';
  msgDelete = 'Deleted Successfully';
  msgNotfound = 'Data not found';
  msgConfirmDelete = 'Are you sure to delete';
  msgClaimFault = 'Unable to release.';
  msgUnableToSave = 'Unable to Save';
  msmType = ['black-snackbar', 'red-snackbar'];

  constructor(private snackBar: MatSnackBar) {}

  show(message = this.msgSave, action = 'Ok') {
    return this.snackBar.open(message, action, {
      duration: 1500,
      verticalPosition: 'bottom',
      horizontalPosition: 'end'
    });
  }
}
