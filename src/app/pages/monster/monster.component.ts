import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    DropdownModule,
    ReactiveFormsModule,
    PlayingCardComponent
],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private fb = inject(FormBuilder)
  private monsterService = inject(MonsterService);

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
 		image: ['', [Validators.required]],
 		type: [MonsterType.ELECTRIC, [Validators.required]],
 		hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
 		figureCaption: ['', [Validators.required]],
 		attackName: ['', [Validators.required]],
 		attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
 		attackDescription: ['', [Validators.required]]
  })

  monster: Monster = Object.assign(new Monster(), this.formGroup.value)
  monsterTypes: MonsterType[] = Object.values(MonsterType)

  monsterId = signal<number>(-1);

  routeSubscription: Subscription | null = null

  private formValuesSubscription: Subscription | null = null 

  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster(), data)
    })
    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['monster']) {
        this.monsterId.set(parseInt(params['monster']))
        const monsterFound = this.monsterService.get(this.monsterId());
        console.log(monsterFound)
        if(monsterFound) {
          this.monster = monsterFound
          this.formGroup.patchValue(this.monster)
        }
      }
      this.monsterId.set(params['monster'] ? parseInt(params['monster']) : -1)
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValuesSubscription?.unsubscribe()
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.monster)
    if (this.monsterId() === -1) {
      this.monsterService.add(this.monster)
    } else {
      this.monster.id = this.monsterId();
      this.monsterService.update(this.monster)
    }
    this.navigateBack();
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched)
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        })
      };
    }
  }

  display() {
    console.log(this.formGroup)
  }
}
