export interface ICard {
  id: number;
  name?: string | null;
  imageURL?: string | null;
  description?: string | null;
}

export type NewCard = Omit<ICard, 'id'> & { id: null };
