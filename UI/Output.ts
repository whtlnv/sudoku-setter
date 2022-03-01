export default class Output {
  static printLine(...data: string[]): void {
    console.log(...data);
  }

  static printGroup(title: string, elements: string[]): void {
    console.group(title);
    elements.forEach((element) => console.log(element));
    console.groupEnd();
  }

  static prompt(message: string, defaultValue: string): string {
    return prompt(message) ?? defaultValue;
  }
}
