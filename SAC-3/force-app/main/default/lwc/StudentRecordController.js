// StudentEditForm.js
import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import StudentEdit from '@salesforce/apex/StudentEditController.editStudent';

export default class StudentEditForm extends LightningElement {
    @api recordId;
    @track studentName;
    @track studentId;
    @track studentGrade;
    @track error;
    
    handleNameChange(event) {
        this.studentName = event.target.value;
    }
    
    handleIdChange(event) {
        this.studentId = event.target.value;
    }
    
    handleGradeChange(event) {
        this.studentGrade = event.target.value;
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const fields = {
            'Name': this.studentName,
            'Id': this.studentId,
            'Grade': this.studentGrade
        };
        
        StudentEdit({ recordId: this.recordId, fields})
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Student record has been updated',
                        variant: 'success',
                        mode: 'dismissable'
                    })
                );
            })
            .catch(error => {
                this.error = error.body.message;
            });
    }
}