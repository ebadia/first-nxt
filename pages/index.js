import Link from 'next/link'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'


const PostLink = ({show}) => (
    <li>
        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
        </Link>
        <style jsx>{`
            a {
                font-family: 'Arial';
            }
            li {
                list-style: none;
                margin: 5px 0;
            }
            a {
                text-decoration: none;
                color: blue;
            }
            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </li>
)



const Index = props => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {/* <PostLink id="hello-next-js" title="Hello Next.js" />
            <PostLink id="learn-next-js" title="Learn Next.js is awesome" />
            <PostLink id="deploy-next-js" title="Deploy apps with Zeit" /> */}
            
            {props.shows.map( show => (
                <PostLink key={show.id} show={show} />
                // <li key={show.id}>
                //     <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                //         <a>{show.name}</a>
                //     </Link>
                // </li>
            ))}
        </ul>
        <style jsx>{`
            h1 {
                font-family: 'Arial';
            }
            ul {
                padding: 0;
            }
        `}</style>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()
    console.log(`Show data fetched. Count ${data.length}`)
    return {
        shows: data.map( entry => entry.show )
    }
}

export default Index