'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/prompts`,
                { cache: 'no-store' }
            );
            const data = await response.json();

            setPosts(data);
        }

        if (session?.user.id) fetchPosts();
    }, [session?.user.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = prompts.filter((p) =>
                    p._id !== post._id
                );

                setPosts(filteredPosts);
            } catch (error) {
                console.log('Error in prompt delete: ', error);
            }
        }
    }

    return (
        <Profile
            name='My'
            desc='Welcome to your peronalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage