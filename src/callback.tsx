import axios from 'axios'
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";

async function authorize (code: string): Promise<any> {

    const navigate = useNavigate();

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code as string);
    params.append('redirect_uri', 'http://localhost:5173/callback/' as string);

    const response = await axios.post<any>(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`, 'utf-8').toString('base64')}`
            }
        }
    );

    sessionStorage.setItem('accessToken', response.data.access_token);

    navigate("/home")
};

export default function CallBack(): any {

    const search = new URLSearchParams(window.location.search)
    const code = search.get('code')!

    authorize(code);
}