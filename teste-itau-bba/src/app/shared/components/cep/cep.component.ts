import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


declare let require: any;
const cep = require('cep-promise');

@Component({
    selector: 'app-cep',
    templateUrl: './cep.component.html',
    styleUrls: ['./cep.component.sass']
})
export class CepComponent implements OnInit {

    form: FormGroup;

    @Input() cep: string | undefined;

    @Output() formCep: EventEmitter<any> = new EventEmitter();

    constructor(
        formBuilder: FormBuilder,
        private toastr: ToastrService
    ) {
        this.form = formBuilder.group({
            cep: ['', [Validators.required, Validators.maxLength(8)]],
            street: ['', Validators.required],
            neighborhood: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
        });
    }

    ngOnInit(): void {

        this.getCep(this.cep);

        this.form.controls.cep.valueChanges
            .pipe(debounceTime(250), distinctUntilChanged())
            .subscribe((value: any) => {
                if (this.form.controls.cep.value.length === 8) {
                    this.getCep(value);
                }
            });
    }

    getCep(cepString: string): void {
        return cep(cepString, { timeout: 1000, providers: ['brasilapi']})
        .then((cepResult: any) => {
            this.form.patchValue(cepResult);
            this.formCep.emit(cepResult);
        }).catch((err: any) => {
            this.toastr.error('CEP não encontrado!');
            console.log(err);
        });
    }

}
