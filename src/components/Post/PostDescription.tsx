import React from 'react';

interface PostDescriptionProps {
    description: string;
}

const PostDescription: React.FC<PostDescriptionProps> = ({ description }) => {
    return <p className="text-gray-700">{description}</p>;
};

export default PostDescription;
