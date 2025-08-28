import Club from "../models/clubModel.js";
import clubMapper from "../mapper/clubMapper.js";

class ClubRepository {
    async create(clubData) {
        try {
            const club = await Club.create(clubData);
            return clubMapper.classToJson(club);
        } catch (error) {
            throw new Error(`Error creating club: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const club = await Club.findById(id);
            return club ? clubMapper.classToJson(club) : null;
        } catch (error) {
            throw new Error(`Error finding club by ID: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const clubs = await Club.find().lean();
            return clubs.length > 0
                ? clubs.map(clubMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding all clubs: ${error.message}`);
        }
    }

    async update(id, clubData) {
        try {
            const updatedClub = await Club.findOneAndUpdate({_id: id}, clubData);
            return updatedClub ? clubMapper.classToJson(updatedClub) : null;
        } catch (error) {
            throw new Error(`Error updating club: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const deletedClub = await Club.findByIdAndDelete(id);
            return deletedClub !== null;
        } catch (error) {
            throw new Error(`Error deleting club: ${error.message}`);
        }
    }

    async existsByOwner(owner){
        try{
            return await Club.exists({owner}).lean();
        } catch (error){
            return false;
        }
    }

    async findByOwner(owner) {
        try {
            const clubs = await Club.find({ owner }).lean();
            return clubs.length > 0
                ? clubs.map(clubMapper.classToJson)
                : [];
        } catch (error) {
            throw new Error(`Error finding clubs by owner: ${error.message}`);
        }
    }

    async findAllDistilled() {
        try {
            return await Club.distinct('distilled');
        } catch (error) {
            throw new Error(`Error finding club distilled: ${error.message}`);
        }
    }

    async findAllNames() {
        try {
            return await Club.distinct('name');
        } catch (error) {
            throw new Error(`Error finding club name: ${error.message}`);
        }
    }

}

export default new ClubRepository();
