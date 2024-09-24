import { Component, computed, effect, model, ModelSignal, signal } from '@angular/core';
import { PlayingCardComponent } from "./components/playing-card/playing-card.component";
import { Monster } from './models/monster.model';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ButtonModule } from 'primeng/button';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    PlayingCardComponent,
    SearchBarComponent,
    ButtonModule,
    CommonModule
  ]
})
export class AppComponent {

  monsters!: Monster[];
  search: ModelSignal<string> = model('')

  filteredMonsters = computed(() => {
    return this.monsters.filter(monster => monster.name.toLowerCase().includes(this.search().toLowerCase()))
  })

  constructor() {
    this.monsters = []

    const monster1 = new Monster();
    monster1.name = "Pik";
    monster1.image = "img/monsters/pik.jpg"
    monster1.hp = 40;
    monster1.type = MonsterType.ELECTRIC
    monster1.figureCaption = "N°002 Pik"
    this.monsters.push(monster1)

    const monster2 = new Monster();
    monster2.name = "Car";
    monster2.image = "img/monsters/car.png"
    monster2.type = MonsterType.WATER
    monster2.hp = 60;
    monster2.figureCaption = "N°003 Car"
    this.monsters.push(monster2)

    const monster3 = new Monster();
    monster3.name = "Bulb";
    monster3.image = "img/monsters/bulb.jpg"
    monster3.type = MonsterType.PLANT
    monster3.hp = 80;
    monster3.figureCaption = "N°004 Bulb"
    this.monsters.push(monster3)

    const monster4 = new Monster();
    monster4.name = "Sala";
    monster4.image = "img/monsters/sala.jpg"
    monster4.type = MonsterType.FIRE
    monster4.hp = 50;
    monster4.figureCaption = "N°005 Sala"
    this.monsters.push(monster4)
  }

}
