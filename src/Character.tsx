export interface Character {
  name: string;
  hp: number;
  attackPower: number;
  defencePower: number;
  fats: number;
  delay: number;
}

export const createCharacter = (stats: any) =>
  ({
    name: stats.name.fi,
    hp: +stats.energyKcal,
    attackPower: +stats.carbohydrate,
    defencePower: +stats.protein,
    fats: +stats.fat,
    delay: +(stats.carbohydrate + stats.fat + stats.protein).toFixed(2)
  } as Character);
