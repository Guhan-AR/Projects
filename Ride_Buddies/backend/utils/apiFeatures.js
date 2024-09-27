class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // 1. Keyword search
    search() {
        const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: 'i', // case-insensitive search
                  },
              }
            : {};

        this.query.find({ ...keyword });
        return this;
    }

    // 2. Price and ratings filtering
    filter() {
        console.log("Original query string:", this.queryStr);  // Add this line to inspect the query string
    
        const queryStrCopy = { ...this.queryStr };
  
        //removing fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach( field => delete queryStrCopy[field]);
        
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        this.query.find(JSON.parse(queryStr));
        console.log("Filtered query string:", queryStr);  // Check if gte, lte are processed correctly

        return this;
    }
    

    // 3. Pagination
    paginate(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;