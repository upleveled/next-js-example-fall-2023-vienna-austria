import { Sql } from 'postgres';
import { Food } from './00003-insertFoods';

export type AnimalFood = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoodId: number;
  animalFoodName: string;
  animalFoodType: string;
};

type JsonAgg = Food[];

export type AnimalWithFoodsInJsonAgg = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoods: JsonAgg | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animal_foods (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      animal_id INTEGER NOT NULL REFERENCES animals (id) ON DELETE CASCADE,
      food_id INTEGER NOT NULL REFERENCES foods (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE animal_foods `;
}
