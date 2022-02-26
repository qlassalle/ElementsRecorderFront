import {ComponentFixture} from '@angular/core/testing';

export class TestPage<T> {
  private fixture: ComponentFixture<T>;

  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  private query<U>(selector: string): U {
    return this.fixture.nativeElement.querySelector(selector);
  }

  getButton(identifier: string) {
    return this.query<HTMLButtonElement>(identifier);
  }

  getInput(identifier: string) {
    return this.query<HTMLInputElement>(identifier);
  }

  getDiv(identifier: string) {
    return this.query<HTMLDivElement>(identifier);
  }

  setInputAndLoseFocus(inputName: string, value) {
    const input: HTMLInputElement = this.getInput(inputName);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    this.fixture.detectChanges();
  }

  testErrorMessageTriggering(inputIdentifier: string, errorDivIdentifier: string, errorMessageDivIdentifier: string, value: any,
                             valid: boolean, expectedErrorMessage: string) {
    expect(this.getDiv(errorDivIdentifier).hasAttribute('hidden')).toEqual(true);
    this.setInputAndLoseFocus(inputIdentifier, value);
    expect(this.getDiv(errorDivIdentifier).hasAttribute('hidden')).toEqual(valid);
    if (!valid) {
      expect(this.getDiv(errorMessageDivIdentifier).textContent.trim()).toEqual(expectedErrorMessage);
    }
  }
}
