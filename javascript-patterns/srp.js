class AnimalOld {
  constructor(animalName) {
    this.animalName = animalName;
  }

  breathe() {
    console.log(`${this.animalName}呼吸空气`);
  }
}

function mainOld() {
  new AnimalOld('牛').breathe();
  new AnimalOld('羊').breathe();
  new AnimalOld('猪').breathe();
}

// 不是所有的动物都呼吸空气的，比如鱼

class AnimalSimple {
  constructor(animalName) {
    this.animalName = animalName;
  }

  breathe() {
    if (this.animalName === '鱼') {
      return console.log(`${this.animalName}呼吸水`);
    }
    console.log(`${this.animalName}呼吸空气`);
  }
}

function mainSimple() {
  new AnimalSimple('牛').breathe();
  new AnimalSimple('羊').breathe();
  new AnimalSimple('猪').breathe();
  new AnimalSimple('鱼').breathe();
}

class AnimalBetter {
  constructor(animalName) {
    this.animalName = animalName;
  }

  breatheAir() {
    console.log(`${this.animalName}呼吸空气`);
  }

  breatheWater() {
    console.log(`${this.animalName}呼吸水`);
  }
}

function mainBetter() {
  new AnimalBetter('牛').breatheAir();
  new AnimalBetter('羊').breatheAir();
  new AnimalBetter('猪').breatheAir();
  new AnimalBetter('鱼').breatheWater();
}


class Animal {
  constructor(animalName) {
    this.animalName = animalName;
  }
}

class Terrestrial extends Animal {
  constructor(name) {
    super(name);
  }

  breathe() {
    console.log(`${this.animalName}呼吸空气`);
  }
}

class Fish extends Animal {
  constructor(name) {
    super(name);
  }

  breathe() {
    console.log(`${this.animalName}呼吸水`);
  }
}
