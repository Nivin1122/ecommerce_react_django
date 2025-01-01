import axios from 'axios';


const saveTokens = (access, refresh) =>{
    localStorage.setItem('access_token',access)
    localStorage.setItem('refresh_token', refresh)
}

const fetchProtectedData = async() =>{
    const accessToken = localStorage.getItem('access_token');

    if (accessToken){
        try{
            const response = await axios.get('http://localhost:8000/users/protected-data/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('Data:', response.data);
        }catch (error) {
            console.error('Error fetching data', error);
        }
}else {
    console.error('Access token not available');
} 
};

const refreshAccessToken = async () =>{
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken){
        try{
            const response = await axios.post('http://localhost:8000/users/token/refresh/', { refresh: refreshToken })
            saveTokens(response.data.access, response.data.refresh);
        }catch (error) {
            console.error('Error refreshing token', error);
        }
    }
}


export { saveTokens, fetchProtectedData, refreshAccessToken };