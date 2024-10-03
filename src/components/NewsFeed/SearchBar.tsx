import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useForm } from "react-hook-form"
import { IPost } from '@/types';
import { useDevounce } from '@/hooks/debounce.hook';
import { useGetSearchItem } from '@/hooks/post.hooks';
import { EditorState, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { Button } from '../ui/button';
import { FaSort } from 'react-icons/fa';
import { Separator } from '../ui/separator';
import Image from 'next/image';

type Props = {
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    refetch: any
}

const SearchBar = ({ sort, setSort, refetch }: Props) => {
    const { register, watch } = useForm();
    const { mutate: handleSearch, data } = useGetSearchItem();
    const [searchResults, setSearchResults] = useState<IPost[] | []>([]);

    const searchTerm = useDevounce(watch("search"));

    useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm);
        }
    }, [searchTerm, handleSearch]);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
        }
        else {
            setSearchResults(data?.data)
        }
    }, [searchTerm, data?.data]);

    const handleSort = () => {
        if (sort === "") {
            setSort("asc")
            refetch()
        } else if (sort === "asc") {
            setSort("desc")
            refetch()
        } else {
            setSort("asc")
            refetch()
        }
    }

    return (
        <div className="mb-4">
            <div className='bg-white shadow-sm px-4 pt-4 rounded-md'>
                <form>
                    <div className="flex-1 relative">
                        <Input
                            {...register("search")}
                            placeholder="Search..."
                            type="text"
                            className="pl-10" // Adjust padding for the icon
                        />
                        <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-base text-gray-400" />
                    </div>
                </form>
                <Separator className='my-2' />
                <div className='flex items-center justify-center my-2 pb-3'>
                    <Button onClick={handleSort}>
                        <span><FaSort /></span>
                        <span>Upvote</span>
                    </Button>
                </div>
            </div>

            {searchResults?.length > 0 && (
                <div className="mt-2 bg-white rounded-xl bg-default-100 p-3">
                    <div className="space-y-3">
                        {searchResults.map((item) => {
                            const contentState = convertFromRaw(JSON.parse(item?.content));
                            const editorState = EditorState.createWithContent(contentState);
                            return (
                                <Link
                                    key={item._id} // Corrected the key attribute
                                    className="text-default-900 block rounded-md bg-default-200 p-2 transition-all hover:bg-gradient-to-l"
                                    href={`/news-feed/${item._id}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Image
                                            width={48}
                                            height={48}
                                            alt={item?._id as string}
                                            className="h-14 w-14 rounded-md object-cover"
                                            src={item?.images[0]}
                                        />
                                        <div>
                                            <p>
                                                <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
