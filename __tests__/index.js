const { createMockContext } = require('@shopify/jest-koa-mocks');
const pagination = require('..');

describe('middleware being tested', () => {
    let ctx;
    let next;
    let middleware;

    beforeEach(() => {
        next = jest.fn();
        ctx = createMockContext();
        middleware = pagination();
    });

    test('ctx.state should to have property paginate', async () => {
        await middleware(ctx, next);

        expect(ctx.state).toHaveProperty('paginate');
    });

    test('ctx.state.pagination should to match object', async () => {
        await middleware(ctx, next);

        expect(ctx.state.paginate).toMatchObject({ limit: 10, page: 1, offset: 0, skip: 0 });
    });
});
