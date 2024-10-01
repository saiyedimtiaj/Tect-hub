import React from 'react';
import { Button } from '../ui/button';

interface ActionButtonsProps {
    likes: number;
    comments: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ likes, comments }) => {
    return (
        <div className="flex items-center space-x-4">
            <Button variant="outline">Like {likes}</Button>
            <Button variant="outline">Comment {comments}</Button>
            <Button variant="outline">Share</Button>
        </div>
    );
};

export default ActionButtons;
