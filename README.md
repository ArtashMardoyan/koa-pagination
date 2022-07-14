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
```javascript
const app = new (require('koa'))();
const pagination = require('koa-pagination-v2');

const { User } = require('../models');

app.use(pagination({ defaultLimit: 20, maximumLimit: 50 }));

app.get('/', async ctx => {
    const { limit, offset, pageable } = ctx.state.paginate;

    const { rows: users, count: total } = await User.findAndCountAll({
        offset,
        limit
    });

    return ctx.ok({ users, _meta: pageable(total) });
});

app.listen(3000);
```

## Request example

```sh
> http://localhost:3000/v1/users?page=1&limit=10
```

## Response example

``` json
{
  "statusName": "OK",
  "statusCode": 200,
  "data": [
    {
      "id": "b79398ef-acf2-4e67-af1b-1482b79886b1",
      "firstName": "Artash",
      "lastName": "Mardoyan",
      "updatedAt": "2022-07-11T08:24:38.337Z",
      "createdAt": "2022-07-11T08:17:05.356Z"
    },
    {
      "id": "b79398ef-acf2-4e67-af1b-1482b79886b2",
      "firstName": "Gagik",
      "lastName": "Alikhanyan",
      "updatedAt": "2022-07-11T08:24:38.337Z",
      "createdAt": "2022-07-11T08:17:05.356Z"
    },
    {
      "id": "b79398ef-acf2-4e67-af1b-1482b79886b3",
      "firstName": "Rafik",
      "lastName": "Abgaryan",
      "updatedAt": "2022-07-11T08:24:38.337Z",
      "createdAt": "2022-07-11T08:17:05.356Z"
    },
    {
      "id": "b79398ef-acf2-4e67-af1b-1482b79886b3",
      "firstName": "Tsolak",
      "lastName": "Harutyunyan",
      "updatedAt": "2022-07-11T08:24:38.337Z",
      "createdAt": "2022-07-11T08:17:05.356Z"
    }
  ],
  "_meta": {
    "total": 4,
    "pageCount": 4,
    "currentPage": 1,
    "hasPrev": false,
    "hasNext": false
  }
}
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
