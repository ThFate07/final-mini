import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxiosFetch = (url, method = 'GET', body = null, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prev => prev + 1);

    if (!url) return { data, loading, error };

    useEffect(() => {
        let controller = new AbortController();

        const fetchData = async () => {
            try {
                const options = {
                    method,
                    headers,
                    data: body,
                };

                const response = await axios(url, {
                    ...options,
                    signal: controller.signal    
                });
                
                
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [reload]);

    return { data, loading, error, refetch };
};

export default useAxiosFetch;
