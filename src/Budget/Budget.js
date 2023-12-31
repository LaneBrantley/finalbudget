import React, { useState } from 'react';
import axios from 'axios';
import pako from 'pako';

function Budget() {
    const local = 'http://localhost:3001/makebudget';
    const server = 'http://161.35.188.98:3000/makebudget';

    const username = localStorage.getItem('username');

    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [tags, setTags] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    }

    const handleTagsChange = (event) => {
        setTags(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Making call to backend to attempt to login
        axios.post(server, {
            username: username,
            title: title,
            budget: budget,
            tags: tags
        })
        .then(function(response) {
            const buffer = pako.inflate(new Uint8Array(response.data), { to: 'string' });
            console.log('success', response.data);
        })
        .catch(function(error) {
            console.log('fail', error);
        });
    }

  return (
    <div>
      <div className="App">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={title} onChange={handleTitleChange} required/>

                <label htmlFor="budget">Budget: </label>
                <input type="number" id="budget" value={budget} onChange={handleBudgetChange} required/>

                <label htmlFor="tags">Tags: </label>
                <input type="text" id="tags" value={tags} onChange={handleTagsChange} required/>

                <button type="submit">Create Budget Item</button>
            </form>
        </div>
    </div>
  );
}

export default Budget;
