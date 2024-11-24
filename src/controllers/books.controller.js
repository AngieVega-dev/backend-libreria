module.exports = class BooksController {

    constructor(datasource) {
        this.datasource = datasource
    }

    list(res, req) {
        const data = this.datasource.read();
        if (data.books.length === 0) {
            res.status(204).json();
            return
        }

        res.status(200).json(data.books);
    }

    listById(req, res) {
        const id = Number(req.params.id);
        const data = this.datasource.read();
        const book = data.books.find((book) => book.id === id);
    
        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });        
        }
    
        res.json(book);
    }

    insert(res, req) {
        const data = this.datasource.read();
        const body = req.body;
        const newBook = {
            id: data.books.length + 1,
            ...body,
        };
        data.books.push(newBook);
        this.datasource.write(data);
        res.json(newBook);
    }

    update(res, req) {
        const data = this.datasource.read();
        
        const body = req.body;
        const id = Number(req.params.id);
        const bookIndex = data.books.findIndex((book) => book.id === id);

        if (bookIndex === -1) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        data.books[bookIndex] = {
            ...data.books[bookIndex],
            ...body,
        };

        this.datasource.write(data);
        res.json({ ...data.books[bookIndex] });
    }

    delete(res, req) {
        try {
            const data = this.datasource.read();
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }

            const bookIndex = data.books.findIndex((book) => book.id === id);

            if (bookIndex === -1) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }

            data.books.splice(bookIndex, 1);
            this.datasource.write(data);

            res.json({ message: "Libro eliminado" });
        } catch (error) {
            res.status(500).json({ error: "Ocurrió un error al eliminar el libro" });
        }
    }

}