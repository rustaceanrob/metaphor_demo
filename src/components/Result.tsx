import Fades from './Fades'
import { ResultArticle } from '../App'
import { AiOutlineLink } from 'react-icons/ai'

type Props = {
    article: ResultArticle
    delay: number,
}

const Result = ({article, delay}: Props) => {
  return (
    <Fades delay={delay} style='flex flex-col w-full border border-zinc-200 dark:border-zinc-800 px-5 py-5 rounded-md'>
        <div className='flex flex-row justify-between items-center px-2 py-2'>
            <div className='flex flex-row justify-center items-center space-x-2'>
                <h1 className='font-link font-bold dark:text-white'>{article.title}</h1>
                <a href={article.url} target='_blank' className='text-zinc-500'><AiOutlineLink/></a> 
            </div>
            <h1 className='font-link dark:text-white'>{article.published}</h1>
        </div>
        <div className='flex flex-row justify-between items-center px-2 py-2'>
            <h1 className='font-link font-bold text-zinc-500'>{article.author}</h1>
        </div>
    </Fades>
  )
}

export default Result