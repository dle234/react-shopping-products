import { http, HttpResponse } from 'msw';

import productList from './products.json';

import { PRODUCTS } from '@/api/endpoints';

export const handlers = [
  http.get(PRODUCTS, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page')) || 0;
    const limit = page === 0 ? 20 : 4;
    const start = page === 0 ? 0 : (page - 1) * 4 + 20;
    const end = start + limit;
    const content = productList.content.slice(start, end);

    const result = {
      ...productList,
      content,
    };

    if (page === 8) {
      result.last = true;
    }

    return HttpResponse.json(result);
  }),
];
