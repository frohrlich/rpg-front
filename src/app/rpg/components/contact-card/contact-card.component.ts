import { Component, OnInit, Input } from '@angular/core';
import { ContactCard } from './model/contact-card.model';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent {
  @Input() contactCard!: ContactCard;
}
