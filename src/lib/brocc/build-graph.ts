import { Node } from './node';

/**
 * A tree of source files.
 */
export class BuildGraph {

  private store = new Map<string, Node>();

  public set(value: Node | Node[]) {
    if (value instanceof Array) {
      value.forEach(
        node => this.store.set(node.url, node)
      );
    } else {
      this.store.set(value.url, value);
    }

    return this;
  }

  public get(url: string): Node {
    return this.store.get(url);
  }

  public has(url: string): boolean {
    return this.store.has(url);
  }

  public entries(): Node[] {
    const values = this.store.values();

    return Array.from(values);
  }

  public filter(by: (value: Node, index: number) => boolean): Node[] {
    return this.entries().filter(by);
  }

  public find(by: (value: Node, index: number) => boolean): Node | undefined {
    return this.entries().find(by)
  }

  get size(): number {
    return this.store.size;
  }

}
