import axios from 'axios';


export default axios.create({
    baseURL:'https://api.yelp.com/v3/businesses',
    headers:{
        Authorization:
        'Bearer lQZ1m4owWncJ-rHSiLx3Gh8ePnKYS1EFpA1HrotKQxPrC-RwJLUqZmDa-_1647QNRqra4bZUG3lx8QMXj0cR1wACyaFFQ60dKBhEdBvpeHFY_qlUx1JsI5uCsP-SaHYx'
    }
})