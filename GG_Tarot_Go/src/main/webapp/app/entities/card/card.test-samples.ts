import { ICard, NewCard } from './card.model';

export const sampleWithRequiredData: ICard = {
  id: 57013,
};

export const sampleWithPartialData: ICard = {
  id: 79141,
  name: 'Wooden Nakfa reboot',
  imageURL: 'Rubber firmware',
  description: 'infomediaries Awesome Music',
};

export const sampleWithFullData: ICard = {
  id: 81125,
  name: 'backing withdrawal JSON',
  imageURL: 'loyalty',
  description: 'Assistant',
};

export const sampleWithNewData: NewCard = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
