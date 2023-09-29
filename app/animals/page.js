import Image from 'next/image';
import Link from 'next/link';
import { getAnimals } from '../../database/animals';

export const metadata = {
  title: 'Animals page',
  description: 'Generated by create next app',
};

export default async function AnimalsPage() {
  const animals = await getAnimals();
  console.log('Check: ', animals);

  return (
    <div>
      <h1>These are my animals</h1>

      {animals.map((animal) => {
        return (
          <div key={`animal-div-${animal.id}`}>
            <Link href={`/animals/${animal.id}`}>{animal.firstName}</Link>
            <Image
              src={`/images/${animal.firstName}.png`}
              alt={animal.firstName}
              width={200}
              height={200}
            />
          </div>
        );
      })}
    </div>
  );
}
