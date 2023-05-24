import { Component, OnInit } from '@angular/core';
import { ContactCard } from '../../components/contact-card/model/contact-card.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  michel!: ContactCard;
  roger!: ContactCard;
  capucine!: ContactCard;

  ngOnInit() {
    this.michel = new ContactCard(
      'assets/img/default_pp.png',
      'Michel ÇAPASSE',
      'Développeur front-end',
      '"Un peu de bootstrap et c\'est réglé"',
      ''
    );

    this.roger = new ContactCard(
      'assets/img/default_pp.png',
      'Roger LEFORCEUR',
      'Développeur back-end',
      '"Spring Data JPA, c\'est cool"',
      ''
    );

    this.capucine = new ContactCard(
      'assets/img/default_pp.png',
      'Capucine DUJARDIN',
      'Graphiste',
      '"Et là on va mettre des fleurs, c\'est joli les fleurs"',
      ''
    );
  }
}