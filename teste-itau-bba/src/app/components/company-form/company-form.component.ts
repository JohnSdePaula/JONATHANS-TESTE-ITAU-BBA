import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { IBusinessModel } from 'src/app/shared/models/itauB.model';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.sass']
})
export class CompanyFormComponent implements OnChanges {

    form: FormGroup;

    cep: string | undefined;

    @Input() company: IBusinessModel | undefined;

    @Output() companyFormSubmit: EventEmitter<any> = new EventEmitter();

    constructor(
        formBuilder: FormBuilder,
        private router: Router
    ) {
        this.form = formBuilder.group({
            name: ['', Validators.required],
            business: ['', Validators.required],
            valuation: ['', Validators.required],
            active: ['', Validators.required],
            cnpj: ['', Validators.required],
            cep: ['', Validators.required],
            street: ['', Validators.required],
            neighborhood: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges): void {
        if (simpleChanges) {
            this.form.patchValue(simpleChanges.company.currentValue);
            this.cep = simpleChanges.company.currentValue.cep;
        }
    }

    handleSubmit(): void {
        const form = cloneDeep(this.form.value);
        if (this.form.valid) {
            this.companyFormSubmit.emit(form);
        }
    }

    back(): void {
        this.router.navigate(['']);
    }

    handleCep(formCep: any): void {
        this.form.patchValue(formCep);
    }

}
