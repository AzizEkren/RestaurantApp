import { useState,useEffect } from 'react';
import yelp from '../api/yelp';


export default () => {
    const [results,setResults] = useState([]);
    const [errorMessage,setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        console.log('Arama terimi:', searchTerm);
        try{
            const response = await yelp.get('/search',{
                params:{
                    limit:50,
                    term:searchTerm,
                    location:'İstanbul',
                }
            })
            console.log('API yanıtı:', response.data.businesses.length, 'sonuç');
            setResults(response.data.businesses);
            setErrorMessage('');
        } catch(error){
            console.log('API hatası:', error);
            setErrorMessage('Bir hata oluştu');
        }


       
    
    
    };
    useEffect(() => {
        searchApi('Toast');
    },[])

    return [searchApi,results,errorMessage];



}