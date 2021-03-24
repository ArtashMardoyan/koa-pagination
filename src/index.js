const _ = require('lodash');

module.exports = () => {
    return async (ctx, next) => {
        const [min, max, def] = [2, 100, 10];
        let { limit, offset, page } = ctx.query;

        const pageValue = _.toNumber(page >= 1 ? page : 1);

        limit = _.toNumber(limit >= min && limit <= max ? limit : def);
        offset = page ? (pageValue - 1) * limit : _.toNumber(Math.max(0, offset)) || 0;

        ctx.state.paginate = { limit, offset, page: pageValue };

        await next();
    };
};
