'use client';

import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function GiphyComponent() {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin')
        }
    })
    const [searchQuery, setSearchQuery] = useState('');
    const [giphyData, setGiphyData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=100`
            );

            if (response.ok) {
                const data = await response.json();
                setGiphyData(data.data);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const fetchDefaultGiphyData = async () => {
            try {
                setIsLoading(true);
                const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
                const defaultResponse = await fetch(
                    `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=100`
                );

                if (defaultResponse.ok) {
                    const defaultData = await defaultResponse.json();
                    setGiphyData(defaultData.data);
                } else {
                    throw new Error('Failed to fetch default data');
                }
            } catch (error) {
                console.error('Error fetching default data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        // Load default Giphy data on initial page load
        fetchDefaultGiphyData();
    }, []); // Empty dependency array to run this effect only once on mount

    useEffect(() => {
        if (searchQuery !== '') {
            handleSearch();
        }
    }, [searchQuery]);

    return (
        
        <div className="giphy-container">
           <div className="search-box flex items-center justify-center my-4">
    
    <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Giphy..."
        className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-indigo-500"
    />
    <button
        onClick={handleSearch}
        className=" bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
    >
        Search
    </button>
    {session && (
    <button
        onClick={() => signOut()}
        className="ml-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
        Logout
    </button>
)}
</div>

            {isLoading && (
                <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
              </div>
              
            )}
            <div className="giphy-cards">
                {/* Display Giphy images as cards */}
                {giphyData.map((gif) => (
                    <div key={gif.id} className="giphy-card">
                        <img src={gif.images.fixed_height.url} alt={gif.title} className="giphy-image" />
                    </div>
                ))}
            </div>
   

        </div>
    );
}
