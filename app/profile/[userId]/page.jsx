'use client';

import { useEffect, useState } from 'react';

import Profile from '@components/Profile';

const ProfilePage = ({ params }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.userId}/prompts`);
            const data = await response.json();

            setPosts(data);
        }

        if (params?.userId) fetchPosts();
    }, [])

    return (
        <Profile
            name={posts[0]?.creator.username || ''}
            desc={`Welcome to ${posts[0]?.creator.username || ''} peronalized profile page`}
            posts={posts}
        />
    )
}

export default ProfilePage