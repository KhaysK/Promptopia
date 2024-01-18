'use client';

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ posts, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        '/api/prompt',
        { cache: 'no-store' }
      );
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const lowerSearchText = searchText.trim().toLowerCase();
    const filtered = posts.filter((post) => {
      return post.prompt.toLowerCase().includes(lowerSearchText) ||
        post.tag.toLowerCase().includes(lowerSearchText) ||
        post.creator.username.toLowerCase().includes(lowerSearchText) ||
        post.creator.email.toLowerCase().includes(lowerSearchText)
    });

    setFilteredPosts(filtered);
  }, [searchText]);

  return (
    <section className='feed'>
      <form 
        className='relative w-full flex-center'
        onSubmit={(e) => {e.preventDefault()}}
      >
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
          required
        />
      </form>

      <PromptCardList
        posts={filteredPosts}
        handleTagClick={(tag) => setSearchText(tag)}
      />
    </section>
  )
}

export default Feed