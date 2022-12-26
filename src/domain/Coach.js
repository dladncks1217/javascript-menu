class Coach {
  #unableEatList;
  #eatenFoods;
  #name;

  constructor(name) {
    this.#name = name;
    this.#unableEatList = [];
    this.#eatenFoods = [];
  }

  setUnableFood(location) {
    this.#unableEatList.push(...location.slice());
  }

  // 오류있었는데 만들어놓고 사용안해서 오류안남
  isAlreadyEatenTwice(menu) {
    let food = this.#eatenFoods.slice();
    food = food.filter((value) => value === menu);
    if (food.length > 1) return true;
    return false;
  }

  getCoachName() {
    const coachName = this.#name + '';
    return coachName;
  }

  suggestMenu(category, verify, suggestFunc) {
    const addCheck = this.#eatenFoods.length;
    let result;
    while (addCheck === this.#eatenFoods.length) {
      let menu = suggestFunc(category);
      if (this.isAlreadyEatenTwice(menu)) continue;
      if (verify(this.#eatenFoods, menu)) continue;
      if (this.#unableEatList.includes(menu)) menu = '';
      this.#eatenFoods.push(menu);
      result = menu;
    }
    return result;
  }

  getResultData() {
    return `${this.#name} | ${this.#eatenFoods.join(' | ')}`;
  }
}

module.exports = Coach;
