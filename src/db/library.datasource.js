const fs = require("fs")

module.exports = class LibraryDatasource {
    read() {
        const data = fs.readFileSync("./src/db/db.json");
        return (JSON.parse(data));
    };
    
    write(data) {
        try {
            fs.writeFileSync("./src/db/db.json", JSON.stringify(data))
        } catch (error) {
            console.log(error);
        }
    };
}