
module.exports = (arr) => {
    
    let result = [];

    for (let i = 0; i < arr.length; i++){
        
        let temp = {
            _id: arr[i]._id,
            name: arr[i].name,
            email: arr[i].email,
            userId: arr[i].userId,
            address:arr[i].address,
            userType: arr[i].userType,
            userStatus: arr[i].userStatus,
            accessToken: arr[i].accessToken,
            createdAt: arr[i].createdAt,
            updatedAt:arr[i].updatedAt
        }

        result.push(temp)
    }

    if (result.length == 1) {
        return result[0]
    }

    return result;
}