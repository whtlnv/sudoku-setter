export default class Output {
  public static printLine(...data: string[]): void {
    console.log(...data);
  }

  public static printGroup(title: string, elements: string[]): void {
    console.group(title);
    elements.forEach((element) => console.log(element));
    console.groupEnd();
  }

  public static prompt(message: string, defaultValue: string): string {
    return prompt(message) ?? defaultValue;
  }
}
