export class OrderIdGenerator {
  seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  generate(date: Date = new Date()): string {
    const year = JSON.stringify(date).slice(1, 5);
    const minDigits = 8;
    this.seed++;
    let sequencial = this.seed.toString().padStart(minDigits, "0");
    return `${year}${sequencial}`;
  }
}
