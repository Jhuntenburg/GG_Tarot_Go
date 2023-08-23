import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../card.test-samples';

import { CardFormService } from './card-form.service';

describe('Card Form Service', () => {
  let service: CardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFormService);
  });

  describe('Service methods', () => {
    describe('createCardFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCardFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            imageURL: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });

      it('passing ICard should create a new form with FormGroup', () => {
        const formGroup = service.createCardFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            imageURL: expect.any(Object),
            description: expect.any(Object),
          })
        );
      });
    });

    describe('getCard', () => {
      it('should return NewCard for default Card initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCardFormGroup(sampleWithNewData);

        const card = service.getCard(formGroup) as any;

        expect(card).toMatchObject(sampleWithNewData);
      });

      it('should return NewCard for empty Card initial value', () => {
        const formGroup = service.createCardFormGroup();

        const card = service.getCard(formGroup) as any;

        expect(card).toMatchObject({});
      });

      it('should return ICard', () => {
        const formGroup = service.createCardFormGroup(sampleWithRequiredData);

        const card = service.getCard(formGroup) as any;

        expect(card).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICard should not enable id FormControl', () => {
        const formGroup = service.createCardFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCard should disable id FormControl', () => {
        const formGroup = service.createCardFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
