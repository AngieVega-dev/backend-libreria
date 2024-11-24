module.exports = class LoansController {

    constructor(datasource) {
        this.datasource = datasource
    }

    list(res, req) {
        const data = this.datasource.read();
    
        if (data.loans.length === 0) {
            res.status(204).json();
            return;
        }
    
        const loans = data.loans.map((loan) => {
            const user = data.users.find(user => user.id === loan.usuario_id);
            const book = data.books.find(book => book.id === loan.libro_id);
    
            return {
                ...loan,
                user: user,
                book: book,
            };
        });
    
        res.status(200).json(loans);
    }
    
    insert(res, req) {
        const data = this.datasource.read();
        const body = req.body;
        const newLoan = {
            id: data.loans.length + 1,
            ...body,
        };
        data.loans.push(newLoan);
        this.datasource.write(data);
        res.json(newLoan);
    }

    update(res, req) {
        const data = this.datasource.read();
        const loanId = parseInt(req.params.id, 10);
        const body = req.body;

        const loanIndex = data.loans.findIndex(loan => loan.id === loanId);

        if (loanIndex === -1) {
            res.status(404).json({ message: "Loan not found" });
            return;
        }

        data.loans[loanIndex] = {
            ...data.loans[loanIndex],
            ...body,
        };

        this.datasource.write(data);

        res.status(200).json(data.loans[loanIndex]);
    }

    delete(res, req) {
        const data = this.datasource.read();
        const loanId = parseInt(req.params.id, 10);

        const loanIndex = data.loans.findIndex(loan => loan.id === loanId);

        if (loanIndex === -1) {
            res.status(404).json({ message: "Loan not found" });
            return;
        }

        const deletedLoan = data.loans.splice(loanIndex, 1)[0];
        this.datasource.write(data);

        res.status(200).json(deletedLoan);
    }
}