import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './rpg/pages/accueil/accueil.component';
import { ContactComponent } from './rpg/pages/contact/contact.component';
import { LegalsComponent } from './rpg/pages/legals/legals.component';
import { ConnexionComponent } from './rpg/pages/connexion/connexion.component';
import { GameComponent } from './rpg/pages/game/game.component';

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'legal', component: LegalsComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'game', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
