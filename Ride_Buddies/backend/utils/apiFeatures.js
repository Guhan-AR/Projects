class APIFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        // 1. Keyword search
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
    
        // 2. Price and ratings filtering
        let filters = {};
    
        if (this.queryStr.price) {
            filters.price = {
                ...(this.queryStr.price.gte && { $gte: this.queryStr.price.gte }),
                ...(this.queryStr.price.lte && { $lte: this.queryStr.price.lte })
            };
        }
    
        if (this.queryStr.ratings) {
            filters.ratings = { $gte: this.queryStr.ratings.gte };
        }
    
        // Combine search and filters
        this.query.find({ ...keyword, ...filters });
        
        return this;
    }
    
    // filter(){
    //     const queryStrCopy = {...this.queryStr};
        
    // }
}

module.exports = APIFeatures;