const ABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

export default class Game {
  constructor(length, code) {
    if (!code) {
      this.code = [];
      for (let i = 0; i < length; i++) {
        if (i < length - (length - 1) / 2) {
          this.code.push(ABC[Math.floor(Math.random() * (ABC.length - 1))]);
        } else {
          this.code.push(
            NUMBERS[Math.floor(Math.random() * (NUMBERS.length - 1))]
          );
        }
      }
      this.code = this.code.join('');
    } else {
      this.code = code;
    }
    this.boardFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w';
  }

  getFen() {
    return this.boardFen;
  }

  setFen(fen) {
    this.boardFen = fen;
  }
}
