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
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) => {
      return post.prompt.includes(searchText) || post.tag.includes(searchText) ||
      post.creator.username.includes(searchText) || post.creator.email.includes(searchText)
    });

    setFilteredPosts(filtered);
  }, [searchText]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
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