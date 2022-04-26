class contract {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async getAllContracts() {
        const results = await this.DBQuery("SELECT * FROM Contract");
        return results;
    }

    async createContract(body) {
        const id = body.ID;
        const land = body.land_id;
        const owner = body.owner;
        const renter = body.renter;
        const start = body.start;
        const end = body.end;

        let result;
        if (id === undefined) {
            result = await this.DBQuery("INSERT INTO Contract(land_id, owner, renter, start, end) VALUES (?,?,?,?,?)", [land, owner, renter, start, end]);
        } else {
            result = await this.DBQuery("INSERT INTO Contract(ID, land_id, owner, renter, start, end) VALUES (?, ?,?,?,?,?)", [id, land, owner, renter, start, end]);
        }
        
        const newRecord = await this.DBQuery("SELECT * FROM Contract WHERE ID = ?", [result.insertId]);
        return newRecord;
    }

    async getContractsById(id) {
        const results = await this.DBQuery("SELECT * FROM Contract WHERE ID = ?", [id]);
        return results;
    }

    async getContractsByOwner(owner) {
        const results = await this.DBQuery("SELECT * FROM Contract WHERE owner = ?", [owner]);
        return results;
    }

    async getContractsByRenter(renter) {
        const results = await this.DBQuery("SELECT * FROM Contract WHERE renter = ?", [renter]);
        return results;
    }
}

module.exports = contract;