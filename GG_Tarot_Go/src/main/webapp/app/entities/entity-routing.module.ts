import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'card',
        data: { pageTitle: 'ggTarotGoApp.card.home.title' },
        loadChildren: () => import('./card/card.module').then(m => m.CardModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
