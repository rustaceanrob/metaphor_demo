import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { BsWifi, BsWifiOff } from "react-icons/bs";
import { LuSettings } from 'react-icons/lu';
import { ImSpinner9 } from 'react-icons/im'
import { AiOutlineSearch } from 'react-icons/ai';
import Fades from "./components/Fades";
import Typed from 'react-typed';
import Result from "./components/Result";

export interface ResultArticle {
  title: string,
  url: string,
  published: string,
  author: string,
}

function App() {
  const [results, setResults] = useState<ResultArticle[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, [])

  const handleInputChange = (chg: string) => {
    setInputValue(chg);
  };

  const handleRequest = () => {
      setInputValue("")
      setLoading(true)
      let articles: ResultArticle[] = [];
      invoke('request', { search: inputValue }).then((res) => {
        let response = JSON.parse(res as string);
        let results_array = response.results;
        results_array.forEach((article: any) => {
          articles.push({
            title: article.title,
            author: article.author,
            url: article.url,
            published: article.publishedDate
          })
        })
        setResults(articles)
      }).catch((err) => {
        console.log(err)
      }).finally(() =>
        setLoading(false)
      )
  } 

  return (
      <div className="w-full h-screen bg-gradient-to-b dark:from-black dark:to-black from-white to-zinc-200 overflow-scroll">
        <div className="flex flex-row w-full justify-between items-center p-5">
          {
            navigator.onLine ? (
              <button>
                <BsWifi size={20} className="text-blue-500"></BsWifi>
              </button>
            ) : (
              <button>
                <BsWifiOff size={20} className="dark:text-white text-black"></BsWifiOff>
              </button>
            )
          }
          <button className="hover:animate-spin">
            <LuSettings size={18} className="dark:text-white text-black"></LuSettings>
          </button>
        </div>
        { results ? (
          <div className="flex flex-col pt-5 pl-20 pr-20 space-y-5 rounded-md overflow-scroll pb-10">
            {
              results.map((result: ResultArticle, index: number) => {
                return <Result key={result.url} article={result} delay={index * 100}/>
              })
            }
            <button className="flex flex-col justify-center items-center" onClick={() => setResults(undefined)}>
              <h1 className="font-link dark:text-white">Search again</h1>
            </button>
          </div>
        ): (
          <Fades delay={100} style="">
            <form 
              className="flex flex-col justify-center items-center pt-40 space-y-10"
              onSubmit={(e) => {
                e.preventDefault()
                handleRequest()
              }}>
                <Typed
                      className="dark:text-zinc-300 text-zinc-700 font-link"
                      strings={['What is a Schnorr signature?', 
                              'How does stable diffusion work?', 
                              'What is the fastest way to learn Rust?']}
                      typeSpeed={120}
                      loop
                  />
                  <div className="flex flex-row justify-center items-center space-x-2">
                    <AiOutlineSearch className="dark:text-white" size={25}/>
                    <input
                    type="text"
                    value={inputValue}
                    className="px-5 py-2 rounded-2xl outline-none border border-zinc-500 dark:text-white bg-gradient-to-tr dark:from-slate-800 dark:to-slate-900 w-96 font-link"
                    onChange={(e) => {
                      e.preventDefault()
                      handleInputChange(e.target.value)
                    }}
                    placeholder="Search for anything..."
                  />
                  </div>
                {loading && <Fades delay={100} style={""}><ImSpinner9 className="animate-spin text-zinc-500"></ImSpinner9></Fades>}
            </form>
          </Fades>
        )}
      </div>
  );
}

export default App;
