export  function upsert (book: any[], newBook: any) {
	const bookIndex = book.findIndex((el) => el.id === newBook.id);
	if (bookIndex === -1) {
		book.push(newBook);
	} else {
		book[bookIndex] = {
			...book[bookIndex],
			...newBook,
		};
	}
	return book;
}