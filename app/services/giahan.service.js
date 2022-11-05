const {ObjectId} = require('mongodb');

class GiaHanService {
    constructor(client){
        this.GiaHan = client.db().collection("phieugiahan");
    }

    extractConactData (payload){
        const phieugiahan = {
            _id : payload._id,
            maphieumuon: payload.maphieumuon,
            thoigiangiahan : payload.thoigiangiahan,
        }
        return phieugiahan;
    }
    extractConactData (payload){
        const phieumuon = {
            _id: payload._id,
            maphieumuon: payload.maphieumuon,
            trangthaiphieu: payload.trangthaiphieu
        }
    }
}

module.exports = GiaHanService;