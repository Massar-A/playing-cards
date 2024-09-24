export enum MonsterType {
    PLANT = "plant",
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = "water"
}

export interface IMonsterProperties {
    imageUrl: string;
    color: string
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
    [MonsterType.PLANT]: {
        imageUrl: 'img/types/plant.png',
        color: 'bg-plant-green'
    },
    [MonsterType.ELECTRIC]: {
        imageUrl: 'img/types/electric.png',
        color: 'bg-electric-yellow'
    },
    [MonsterType.FIRE]: {
        imageUrl: 'img/types/fire.png',
        color: 'bg-fire-red'
    },
    [MonsterType.WATER]: {
        imageUrl: 'img/types/water.png',
        color: 'bg-water-blue'
    }
}