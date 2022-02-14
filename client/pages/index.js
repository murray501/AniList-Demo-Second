import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Router, useRouter } from 'next/router';

export async function getStaticProps() {
    const { data } = await client.query({
        query: gql`
        {
            Page {
                media(sort: POPULARITY_DESC, type: ANIME) {
                    id
                    title {
                        english
                    }
                    coverImage {
                        large
                    }
                }
            }
        }
        `,
    });
    
    return {
        props: {
            media: data.Page.media
        }
    }
}

export default function Index({media}) {
    return (
        <section class="section">
             <div class="columns is-multiline">
                {media.map(x => <EachMedia data={x} />)}                 
             </div>
        </section>      
    )
}

function EachMedia({data}) {
    const router = useRouter();

    const clickImg = () => {
        router.push({
            pathname:"/media",
            query: { id: data.id }
        })
    }

    return (
        <div class="column is-6-tablet is-4-desktop is-3-widescreen">
            <article class="box">
                <div class="media">
                    <div class="media-content">
                        <figure>
                            <img src={data.coverImage.large} width="200" height="300" onClick={clickImg} />
                        </figure>
                        <p>
                            <strong>{data.title.english}</strong>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

