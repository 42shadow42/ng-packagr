import { InjectionToken, Provider, ReflectiveInjector } from 'injection-js';
import { of as observableOf } from 'rxjs/observable/of';
import { take, map } from 'rxjs/operators';
import { buildNgPackage } from '../steps/build-ng-package';
import { BuildGraph } from '../brocc/build-graph';
import { Node } from '../brocc/node';
import { provideProject, PACKAGE_TRANSFORM_TOKEN, PACKAGE_TRANSFORM_PROVIDER } from './package.transform';

export class NgPackagr {

  constructor(
    private providers: Provider[]
  ) {}

  public withProviders(providers: Provider[]): NgPackagr {
    this.providers = [
      ...this.providers,
      ...providers
    ];

    return this;
  }

  public forProject(project: string): NgPackagr {
    this.providers.push(provideProject(project));

    return this;
  }

  public build(): Promise<void> {
    const injector = ReflectiveInjector.resolveAndCreate(this.providers);

    // TODO
    const transforms = injector.get(PACKAGE_TRANSFORM_TOKEN);

    return observableOf(new BuildGraph())
      .pipe(
        transforms,
        take(1),
        map(() => {})
      ).toPromise();
  }

}

export const ngPackagr = (): NgPackagr => new NgPackagr([
  PACKAGE_TRANSFORM_PROVIDER,

  // TODO: default providers come here
]);
