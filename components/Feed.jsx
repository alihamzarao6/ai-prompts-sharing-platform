'use client'

import React, { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
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
  const [allPosts, setAllPosts] = useState([]);

  // states which will be using in search.
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    };

    fetchPosts();

  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter((p) => regex.test(p.creator.username) || regex.test(p.tag) || regex.test(p.prompt));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    // debounce
    setSearchTimeout(() => {
      const searchResults = filterPrompts(e.target.value);
      setSearchedResults(searchResults);
    }, 500);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResults = filterPrompts(tagName);

    setSearchedResults(searchResults);
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}


    </section>
  )
}

export default Feed