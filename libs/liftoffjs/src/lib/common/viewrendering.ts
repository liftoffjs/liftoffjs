import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import {
  CreateReactContextRenderMiddleware,
  DefaultTsxRenderMiddleware,
  PrettifyRenderMiddleware,
  ReactViewsContext,
  TsxRenderContext,
} from 'express-tsx-views';
import { mergeMap, Observable } from 'rxjs';

export class JsxResult<PropsT> {
  constructor(readonly component: any, readonly props: PropsT) {}
}

@Injectable()
export class JsxInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse() as Response<string, ReactViewsContext<any>>;
    const locals = res.locals;
    return next.handle().pipe(
      mergeMap(async (data: any) => {
        if (data instanceof JsxResult) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          let context = new TsxRenderContext(data.component, data.props);

          const defaultRenderer = new DefaultTsxRenderMiddleware();

          const middlewares = [];

          res.locals.contexts?.forEach(([Context, props]) => {
            middlewares.push(new CreateReactContextRenderMiddleware(Context, props));
          });

          middlewares.push(new PrettifyRenderMiddleware());

          // eslint-disable-next-line sonarjs/no-ignored-return, unicorn/no-array-reduce
          middlewares.reduce((prev, next) => {
            prev.setNext(next);
            return next;
          }, defaultRenderer);

          context = defaultRenderer.createElement(context);

          if (!context.hasElement()) {
            throw new Error('element was not created');
          }

          context = await defaultRenderer.render(context);

          if (!context.isRendered) {
            throw new Error('element was not rendered');
          }

          return context.html!;
        }

        return data;
      })
    );
  }
}
