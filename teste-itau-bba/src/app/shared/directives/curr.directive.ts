import { Directive, OnInit, ElementRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[appCurrency]'})

export class CurrencyDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe,
    private ngControl: NgControl
  ) { }

  private numberToString(value: any): string {
    return this.currencyPipe.transform(value ? value : 0, 'BRL', 'symbol', '1.2-2', 'pt-BR');
  }

  private stringToNumber(value: null | number | string): number {
    if (typeof value === 'string') {
      const minus = value.match(new RegExp(/-/, 'g'));
      const isNegative = minus && minus.length === 1 ? true : false;
      value = value.replace(/\D/g, '');
      if (isNegative) {
        value = '-' + value;
      }
      value = Number(parseFloat(value) / 100);
    }
    return value || 0;
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.value = this.numberToString(this.elementRef.nativeElement.value);
    this.ngControl.control.setValue(this.stringToNumber(this.ngControl.control.value), {
      emitEvent: false,
      emitModelToViewChange: false,
      emitViewToModelChange: false
    });
    this.ngControl.control.valueChanges
      .subscribe((value: any) => {
        value = this.stringToNumber(value);
        this.elementRef.nativeElement.value = this.numberToString(value);
        this.ngControl.control.setValue(value, {
          emitEvent: false,
          emitModelToViewChange: false,
          emitViewToModelChange: false
        });
      });
  }

}