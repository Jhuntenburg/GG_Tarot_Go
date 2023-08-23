import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICard, NewCard } from '../card.model';

export type PartialUpdateCard = Partial<ICard> & Pick<ICard, 'id'>;

export type EntityResponseType = HttpResponse<ICard>;
export type EntityArrayResponseType = HttpResponse<ICard[]>;

@Injectable({ providedIn: 'root' })
export class CardService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cards');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(card: NewCard): Observable<EntityResponseType> {
    return this.http.post<ICard>(this.resourceUrl, card, { observe: 'response' });
  }

  update(card: ICard): Observable<EntityResponseType> {
    return this.http.put<ICard>(`${this.resourceUrl}/${this.getCardIdentifier(card)}`, card, { observe: 'response' });
  }

  partialUpdate(card: PartialUpdateCard): Observable<EntityResponseType> {
    return this.http.patch<ICard>(`${this.resourceUrl}/${this.getCardIdentifier(card)}`, card, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCardIdentifier(card: Pick<ICard, 'id'>): number {
    return card.id;
  }

  compareCard(o1: Pick<ICard, 'id'> | null, o2: Pick<ICard, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardIdentifier(o1) === this.getCardIdentifier(o2) : o1 === o2;
  }

  addCardToCollectionIfMissing<Type extends Pick<ICard, 'id'>>(
    cardCollection: Type[],
    ...cardsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cards: Type[] = cardsToCheck.filter(isPresent);
    if (cards.length > 0) {
      const cardCollectionIdentifiers = cardCollection.map(cardItem => this.getCardIdentifier(cardItem)!);
      const cardsToAdd = cards.filter(cardItem => {
        const cardIdentifier = this.getCardIdentifier(cardItem);
        if (cardCollectionIdentifiers.includes(cardIdentifier)) {
          return false;
        }
        cardCollectionIdentifiers.push(cardIdentifier);
        return true;
      });
      return [...cardsToAdd, ...cardCollection];
    }
    return cardCollection;
  }
}
