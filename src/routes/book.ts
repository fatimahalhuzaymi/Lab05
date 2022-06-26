import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsert } from '../controllers/upsert-book';

const book = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
});
type book = Static<typeof book>;

const GetBooksQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetBooksQuery = Static<typeof GetBooksQuery>;

export let books: book[] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'book1' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', name: 'book2'},
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', name: 'book3' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', name: 'book4' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', name: 'book5'},
	
];

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/book',
		schema: {
			summary: 'Updates or insets a book',
			tags: ['books'],
			body: books, // default 3dleha // البدي ياخذ تايب سكيما
		},
		handler: async (request, reply) => {
			const newBook: any = request.body;
			return upsert(books, newBook);
		},
	});
   
    server.route({
		method: 'PATCH',
		url: '/book/:id',
		schema: {
			summary: 'Update a book by id + you dont need to pass all properties',
			tags: ['enjaz'],
			body: Type.Partial(book),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newBook: any = request.body;
			return upsert(books, newBook);
		},
	});

	server.route({
		method: 'DELETE',
		url: '/book/:id',
		schema: {
			summary: 'Deletes a enjaz',
			tags: ['enjaz'],
            params: Type.Object({
                id: Type.String({
                    format: 'uuid' })
            })
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			books = books.filter((c) => c.id !== id);

			return books;
		},
	});


	server.route({
		method: 'GET',
		url: '/book/:id',
		schema: {
			summary: 'Returns one enjaz or null',
			tags: ['enjaz'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([book, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return books.find((c) => c.id === id) ?? null;
		},
	});
	server.route({
		method: 'GET',
		url: '/book',
		schema: {
			summary: 'Gets all books',
			tags: ['book'],
            params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Array(book),			},
		},
		
		handler: async (request, reply) => {
			const query = request.query as GetBooksQuery;

			if (query.name) {
				return books.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return books;
			}
		},
	});
}

// arrar for faviorate