const { Random } = require('@woowacourse/mission-utils');
const Coach = require('../src/domain/Coach');
const getSuggestMenu = require('../src/utils/getSuggestMenu');
const verify = require('../src/utils/verify');

describe('도메인 단위 테스트', () => {
  test('코치 이름을 가져오는 메서드', () => {
    const coach = new Coach('jun');
    expect(coach.getCoachName()).toBe('jun');
  });

  test('특정 카테고리가 지정되었다면 한 메뉴를 반환해주는 메서드', () => {
    const coach = new Coach('pobi');
    Random.shuffle = jest.fn();
    Random.shuffle.mockReturnValueOnce([4, 1, 2, 3, 5, 6, 7, 8, 9]);
    expect(coach.suggestMenu(1, verify.eatenTwice, getSuggestMenu)).toBe('된장찌개');
  });

  test('2번 이상 먹은 메뉴인지 확인', () => {
    const coach = new Coach('haha');
    Random.shuffle = jest.fn();
    Random.shuffle.mockReturnValueOnce([4, 1, 2, 3, 5, 6, 7, 8, 9]);
    Random.shuffle.mockReturnValueOnce([4, 2, 5, 1, 4, 8, 6, 9, 7]);
    coach.suggestMenu(1, verify.eatenTwice, getSuggestMenu);
    coach.suggestMenu(1, verify.eatenTwice, getSuggestMenu);
    expect(coach.isAlreadyEatenTwice('된장찌개')).toBe(true);
  });
});
