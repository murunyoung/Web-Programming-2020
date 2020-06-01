function cs142MakeMultiFilter(originalArray) {
    var currentArray = originalArray;
    function arrayFilter (filterCriteria, callback) {
        
        if (typeof filterCriteria === "function") {
            currentArray = currentArray.filter(filterCriteria);
        }else{
            return currentArray;
        }
        if (typeof callback === "function") {
            callback.call(originalArray, currentArray);
        }
        return arrayFilter;
    }
    return arrayFilter;
}