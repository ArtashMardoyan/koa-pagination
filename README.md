# koa-pagination-v2

> Pagination middleware for [Koa](https://github.com/koajs/koa).

[![npm version][npm_version_badge]][npm_version_url]
[![npm downloads][npm_download-badge]][npm_download-url]
[![install size][install_size-badge]][install_size-url]
[![MIT License][license-badge]][license-url]


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
pagination({ defaultLimit: 20, maximumLimit: 50 });
```

## Usage

#### For the Sequelize ORM
```javascript
const app = new (require('koa'))();
const pagination = require('koa-pagination-v2');

const { User } = require('../models');

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
#### For the Mongoose ODM
```javascript
const app = new (require('koa'))();
const pagination = require('koa-pagination-v2');

const { User } = require('../models');

app.use(pagination({ defaultLimit: 20, maximumLimit: 50 }));

app.get('/', async ctx => {
    const { limit, skip, page } = ctx.state.paginate;

    const [users, total] = await Promise.all([
        await User.find().skip(skip).limit(limit),
        await User.countDocuments()
    ]);

    return ctx.ok({
        users,
        _meta: { page, total, pageCount: Math.ceil(total / limit) }
    });
});

app.listen(3000);
```

## Request example

```sh
> http://localhost:3000/v1/users?page=1&limit=10
```

## License

[MIT][license-url]

[npm_download-badge]:https://img.shields.io/npm/dm/koa-pagination-v2.svg?style=flat
[npm_download-url]:http://npm-stat.com/charts.html?package=koa-pagination-v2
[npm_version_badge]:https://img.shields.io/npm/v/koa-pagination-v2.svg?style=flat
[npm_version_url]:https://www.npmjs.org/package/koa-pagination-v2
[install_size-badge]:https://packagephobia.com/badge?p=koa-pagination-v2&style=flat
[install_size-url]:https://packagephobia.now.sh/result?p=koa-pagination-v2
[license-badge]:https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat
[license-url]:https://github.com/ArtashMardoyan/koa-pagination/blob/master/LICENSE
