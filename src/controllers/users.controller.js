module.exports = class UsersController {

    constructor(datasource) {
        this.datasource = datasource
    }

    list(res, req) {
        const data = this.datasource.read();
        if (data.users.length === 0) {
            res.status(204).json();
            return
        }

        res.status(200).json(data.users);
    }

    listById(req, res) {
        const id = req.params.id;
        const data = this.datasource.read();
        const user = data.users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user);
    }

    insert(res, req) {
        const data = this.datasource.read();
        const body = req.body;
        const user = {
            ...body,
            fecha_registro: new Date()
        }
        data.users.push(user);
        this.datasource.write(data);
        res.json(user);
    }

    update(res, req) {
        const data = this.datasource.read();

        const body = req.body;
        const id = req.params.id;
        const userIndex = data.users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        data.users[userIndex] = {
            ...data.users[userIndex],
            ...body,
        };

        this.datasource.write(data);
        res.json({ ...data.users[userIndex] });
    }

    delete(res, req) {
        try {
            const data = this.datasource.read();
            const id = req.params.id;

            const userIndex = data.users.findIndex((user) => user.id === id);

            if (userIndex === -1) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            data.users.splice(userIndex, 1);
            this.datasource.write(data);

            res.json({ message: "Usuario eliminado" });
        } catch (error) {
            res.status(500).json({ error: "Ocurrió un error al eliminar el usuario" });
        }
    }
}