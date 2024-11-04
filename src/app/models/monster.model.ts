import { MonsterType } from "../utils/monster.utils";

export class Monster {
    id: number = -1;
    name: string = "My Monster";
    image: string = "img/monsters/pik.jpg";
    type: MonsterType = MonsterType.ELECTRIC;
    hp: number = 40;
    figureCaption: string = "N°001 Monster";
    attackName: string = "Geo Impact";
    attackStrength: number = 60;
    attackDescription: string = "This is a description of monster capacity. et blablablablablabla"

    copy(): Monster {
        return Object.assign(new Monster(), this)
    }
}