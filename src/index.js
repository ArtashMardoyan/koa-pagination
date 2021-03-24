module.exports = ({ maxLimit, defaultLimit }) => {
    const _maxLimit = typeof maxLimit === 'number' ? parseInt(maxLimit, 10) : 100;
    const _defaultLimit = typeof defaultLimit === 'number' ? parseInt(defaultLimit, 10) : 10;

    return async (ctx, next) => {
        let { page, limit } = ctx.query;

        page = Math.abs(parseInt(page, 10)) || 1;
        limit = Math.abs(parseInt(limit, 10)) || _defaultLimit;

        limit = limit > _maxLimit ? _maxLimit : limit;

        const offset = page * limit - limit;

        ctx.state.paginate = { limit, page, offset, skip: offset };

        await next();
    };
};
