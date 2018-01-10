let NODE_COUNT = 0;

export class Node {

  private readonly count: number;

  constructor (
    public readonly url: string
  ) {
    this.count = NODE_COUNT++;

  }

  public dependents: Node[] = [];

  public type: string;

  public data: any;

}
