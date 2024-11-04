import { Component, computed, inject, model, ModelSignal, signal } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [
    PlayingCardComponent,
    SearchBarComponent,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {
  monsters = signal<Monster[]>([]);
  search: ModelSignal<string> = model('')
  private monsterService = inject(MonsterService)
  private router = inject(Router)

  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => monster.name.toLowerCase().includes(this.search().toLowerCase()))
  })

  constructor() {
    this.monsters.set(this.monsterService.getAll())
  }

  addMonster() {
    this.router.navigate(['monster'])
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id])
  }
}
