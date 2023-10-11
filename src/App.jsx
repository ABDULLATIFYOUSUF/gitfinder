import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0);
  const [userData, setUserData] = useState({});
  const [repositories, setRepositories] = useState([]); // State for repositories
  const [searchInput, setSearchInput] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    callAPI('abdullatifyousuf');
    setUserNotFound(false);
  }, []);

  const callAPI = async (userName) => {
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${userName}`
      );
      const reposResponse = await axios.get(
        `https://api.github.com/users/${userName}/repos`
      );

      console.log(userResponse.data);
      console.log(reposResponse.data);

      setUserData(userResponse.data);
      setRepositories(reposResponse.data);

      setUserNotFound(false);
    } catch (error) {
      setUserNotFound(true);
      console.log(error);
    }
  };

  const input = document.getElementById('input');
  const hanleuserApi = (e) => {
    e.preventDefault();
    callAPI(searchInput);
    input.value = '';
  };

  return (
    <>
      <div className='font-bold text-sky-300 w-full bg-cyan-950 text-left p-5'>
        <h1 className='text-4xl text-center font-serif pt-2 pb-4 underline'>
          Git Finder
        </h1>
        <div>
          <form onSubmit={hanleuserApi}>
            <input
              autoComplete='off'
              id='input'
              onChange={(e) => setSearchInput(e.target.value)}
              className='w-full h-10 p-2 rounded-lg my-14 mb-5 text-slate-400 border'
              type='text'
              placeholder='Enter User Name...'
            />
          </form>
        </div>
        {userNotFound ? (
          <NotFound />
        ) : (
          <div>
            <img
              className='w-60 h-60 rounded-full mx-auto border-t-8 border-t-sky-100 border-b-8 border-b-sky-100 border-r-8 border-r-purple-900 border-l-8 border-l-purple-900'
              src={userData?.avatar_url}
            />
            <marquee className='text-xl w-full border font-serif p-2 mt-5 rounded-lg text-center font-bold'>
              {userData?.bio ? userData?.bio : 'Bio data not Available'}
            </marquee>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Name: <span className='text-2xl mx-2 text-white'>{userData?.name ? userData?.name : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              User Name: <span className='text-2xl mx-2 text-white'>{userData?.login ? userData?.login : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Company Name: <span className='text-2xl mx-2 text-white'>{userData?.company ? userData?.company : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Email: <span className='text-2xl mx-2 text-white'>{userData?.email ? userData?.email : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              City: <span className='text-2xl mx-2 text-white'> {userData?.location ? userData?.location : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Followers: <span className='text-2xl mx-2 text-white'> {userData?.followers ? userData?.followers : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Following: <span className='text-2xl mx-2 text-white'> {userData?.following ? userData?.following : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Public Repositories: <span className='text-2xl mx-2 text-white'> {userData?.public_repos ? userData?.public_repos : 'null'}</span>
            </h1>
            <h1 className='text-3xl font-serif py-5 pb-4 font-bold'>
              Web Site Link: <span className='text-2xl mx-2 text-white'>
                <a target='_blank' href={userData?.blog}>
                  {userData?.blog ? <button className='hover:underline text-lg hover:translate-x-4 hover:transition-all hover:text-2xl'>Click here</button> : 'No website mention on github'}
                </a>
              </span>
            </h1>
            <h1 className='text-xl font-serif py-5 pb-4 text-center font-bold'>
              Last Update at: <span className='text-2xl mx-2 text-white'> {userData?.updated_at}</span>
            </h1>

            {/* Display repositories */}
            <h1 className='text-4xl text-center font-serif pt-2 pb-4 underline'>Repositories</h1>
            <ul>
              {repositories.map((repo) => ( 
                <button className='border p-5 rounded-lg w-64 cursor-pointer m-2' key={repo.id}>
                  <a href={repo.html_url} target='_blank'>{repo.name}</a>
                </button>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
