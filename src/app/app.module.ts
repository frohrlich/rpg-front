import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './rpg/layouts/header/header.component';
import { FooterComponent } from './rpg/layouts/footer/footer.component';
import { AccueilComponent } from './rpg/pages/accueil/accueil.component';
import { LogoboxComponent } from './rpg/components/logobox/logobox.component';
import { NavbarComponent } from './rpg/components/navbar/navbar.component';
import { AccrocheComponent } from './rpg/components/accroche/accroche.component';
import { ScreenshotsComponent } from './rpg/layouts/screenshots/screenshots.component';
import { DescriptionComponent } from './rpg/components/description/description.component';
import { NewsComponent } from './rpg/components/news/news.component';
import { ContactComponent } from './rpg/pages/contact/contact.component';
import { LegalsComponent } from './rpg/pages/legals/legals.component';
import { ConnexionComponent } from './rpg/pages/connexion/connexion.component';
import { GameComponent } from './rpg/pages/game/game.component';

import { MentionsLegalesComponent } from './rpg/components/mentions-legales/mentions-legales.component';

import { ContactCardComponent } from './rpg/components/contact-card/contact-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    LogoboxComponent,
    NavbarComponent,
    AccrocheComponent,
    ScreenshotsComponent,
    DescriptionComponent,
    NewsComponent,
    ContactComponent,
    LegalsComponent,
    ConnexionComponent,
    GameComponent,

    MentionsLegalesComponent,

    ContactCardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
