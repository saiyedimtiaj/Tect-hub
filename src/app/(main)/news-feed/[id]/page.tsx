// pages/post/[id].tsx

import PostDetails from "@/components/Post/PostDetails";

interface User {
    name: string;
    avatar: string;
}

interface Comment {
    id: number;
    user: User;
    content: string;
}

interface Post {
    id: string;
    user: User;
    createdAt: string;
    description: string;
    images: string[];
    likes: number;
    comments: Comment[];
}

const PostPage = () => {
    const dummyPost: Post = {
        id: '1',
        user: { name: 'John Doe', avatar: '/user-avatar.png' },
        createdAt: new Date().toISOString(),
        description: 'This is a beautiful scenery!',
        images: [
            'https://res.cloudinary.com/ddhb3f9rg/image/upload/v1727632754/tb84ebd64irzhkassg6g.jpg',
            'https://res.cloudinary.com/ddhb3f9rg/image/upload/v1727632807/v0weg47y0bw0xskmv0na.jpg',
            'https://res.cloudinary.com/ddhb3f9rg/image/upload/v1727632754/tb84ebd64irzhkassg6g.jpg'
        ],
        likes: 23,
        comments: [
            {
                id: 1,
                user: {
                    name: 'Jane Doe',
                    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                },
                content: 'Amazing post!'
            },
            {
                id: 2,
                user: {
                    name: 'John Smith',
                    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                },
                content: 'Looks great!'
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
            <PostDetails post={dummyPost} />
        </div>
    );
};

export default PostPage;
