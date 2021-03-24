# koa-pagination-v2

## Installation

Install the package via `yarn`:

```sh
> yarn add koa-pagination-v2
```

or via `npm`:

```sh
> npm install koa-pagination-v2 --save
```

## Configuration

The middleware can be configured with the following parameters:

- `defaultLimit`: Default number of items allowed per page (`10` by default).
- `maximumLimit`: Maximum number of items allowed per page (`100` by default).

You can change the defaults by doing:

```javascript
pagination({
  defaultLimit: 20,
  maximumLimit: 50
});
```

## Usage

```javascript
const app = new (require('koa'))();
const pagination = require('koa-pagination-v2');

app.use(pagination({ defaultLimit: 20, maximumLimit: 50 }));

app.get('/', async ctx => {
    const { limit, offset, page } = ctx.state.paginate;

    const { rows: users, count: total } = await User.findAndCountAll({
        offset,
        limit
    });

    return ctx.ok({
        users,
        _meta: { page, total, pageCount: Math.ceil(total / limit) }
    });
});

app.listen(3000);
```
