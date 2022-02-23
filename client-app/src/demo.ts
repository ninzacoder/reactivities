const duck1:Duck = {
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)
}

const duck2: Duck = {
    name: 'feduey',
    numLegs: 2,
    makeSound: (sound: string) => console.log(sound)
}

duck1.makeSound!('test');
duck2.makeSound!('test');

interface Duck{
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

class Duck1{

}

export const ducks = [duck1, duck2]