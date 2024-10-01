import React from 'react';
import { Avatar } from '../ui/avatar';

interface UserDetailsProps {
    user: { name: string; avatar: string };
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10" src={user.avatar} alt="User Avatar" />
            <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">Posted on {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default UserDetails;
