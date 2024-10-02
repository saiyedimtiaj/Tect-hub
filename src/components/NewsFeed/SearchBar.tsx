import React, { useState } from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
    const [searchResults, setSearchResults] = useState([{
        id: "hsdughdrgh",
        thumbnail: "https://res.cloudinary.com/ddhb3f9rg/image/upload/v1727632754/tb84ebd64irzhkassg6g.jpg",
        description: "sduoihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhn v08ydzroi gth uianh78vyaweuk v4g wtubvg DAFGKJLA UHIHDFG J M95H875Y NDFGHJ WOEVINTJ IUWQN8TUQ  834QY5N9 VB"
    }]); // State to store the search results

    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        performSearch(searchTerm);
    };

    // Mock function to simulate search results
    const performSearch = (term: string) => {
        // You can replace this with an actual API call
        const results = mockData.filter(item =>
            item.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(results as any);
    };

    // Mock search data
    const mockData = [
        {
            _id: '1',
            thumbnail: '/images/item1.jpg',
            title: 'Responsive Design in CSS',
            description: 'Learn the best practices of responsive design.',
        },
        {
            _id: '2',
            thumbnail: '/images/item2.jpg',
            title: 'Mastering Flexbox',
            description: 'A complete guide to flexbox layout in CSS.',
        },
    ];

    return (
        <div className="mb-4">
            <div className='bg-white shadowsm p-4 rounded-md'>
                <form onSubmit={handleSubmit}>
                    <div className="flex-1 relative">
                        <Input
                            name='search'
                            aria-label="Search"
                            placeholder="Search..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                            className="pl-10" // Adjust padding for the icon
                        />
                        <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-base text-gray-400" />
                    </div>
                </form>
            </div>

            {searchResults.length > 0 && (
                <div className="mt-2 bg-white rounded-xl bg-default-100 p-3">
                    <div className="space-y-3">
                        {searchResults.map((item: any) => (
                            <Link
                                key={item._id} // Corrected the key attribute
                                className="text-default-900 block rounded-md bg-default-200 p-2 transition-all hover:bg-gradient-to-l"
                                href={`/found-items/${item._id}`}
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        alt={item.title}
                                        className="h-14 w-14 rounded-md object-cover"
                                        src={item.thumbnail}
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{item.title}</p>
                                        <p className="mt-1 line-clamp-2 h-11 w-full text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-3 flex justify-center border-t pt-3">
                        <button
                            className="flex items-center justify-center gap-1"
                            onClick={() => performSearch(searchTerm)}
                        >
                            <span>See All</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
