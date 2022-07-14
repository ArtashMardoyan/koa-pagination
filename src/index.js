module.exports = (option = {}) => {
    const { maximumLimit, defaultLimit } = option;

    const _maximumLimit = typeof maximumLimit === 'number' ? parseInt(maximumLimit, 10) : 100;
    const _defaultLimit = typeof defaultLimit === 'number' ? parseInt(defaultLimit, 10) : 10;

    return async (ctx, next) => {
        let { page, limit } = ctx.query;

        page = Math.abs(parseInt(page, 10)) || 1;
        limit = Math.abs(parseInt(limit, 10)) || _defaultLimit;

        limit = limit > _maximumLimit ? _maximumLimit : limit;

        const offset = page * limit - limit;

        ctx.state.paginate = {
            page,
            limit,
            offset,
            skip: offset,
            pageable: total => ({
                total,
                currentPage: page,
                hasPrev: offset > 0,
                hasNext: total > offset + limit,
                pageCount: Math.ceil(total / limit)
            })
        };

        await next();
    };
};
