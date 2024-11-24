module.exports = class AuthorsController {

    constructor(datasource) {
        this.datasource = datasource
    }

    list(res, req) {
        const data = this.datasource.read();
        if (data.authors.length === 0) {
            res.status(204).json();
            return
        }

        res.status(200).json(data.authors);
    }

    listById(req, res) {
        const id = Number(req.params.id);
        const data = this.datasource.read();
        const author = data.authors.find((author) => author.id === id);

        if (!author) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }

        res.json(author);
    }

    insert(res, req) {
        const data = this.datasource.read();
        const body = req.body;
        const newauthor = {
            id: data.authors.length + 1,
            ...body,
        };
        data.authors.push(newauthor);
        this.datasource.write(data);
        res.json(newauthor);
    }

    update(res, req) {
        const data = this.datasource.read();

        const body = req.body;
        const id = Number(req.params.id);
        const authorIndex = data.authors.findIndex((author) => author.id === id);

        if (authorIndex === -1) {
            return res.status(404).json({ message: "Autor no encontrado" });
        }

        data.authors[authorIndex] = {
            ...data.authors[authorIndex],
            ...body,
        };

        this.datasource.write(data);
        res.json({ ...data.authors[authorIndex] });
    }

    delete(res, req) {
        try {
            const data = this.datasource.read();
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }

            const authorIndex = data.authors.findIndex((author) => author.id === id);

            if (authorIndex === -1) {
                return res.status(404).json({ error: "Autor no encontrado" });
            }

            data.authors.splice(authorIndex, 1);
            this.datasource.write(data);

            res.json({ message: "Autor eliminado" });
        } catch (error) {
            res.status(500).json({ error: "Ocurrió un error al eliminar el autor" });
        }
    }

}