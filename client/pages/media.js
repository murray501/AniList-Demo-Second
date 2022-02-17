import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Router, useRouter } from 'next/router';

export async function getServerSideProps(context) {

    const type = context.query.type;
    const sort = context.query.sort;
    const variables = {type: type, sort: sort + "_DESC"};

    const query = gql`
        query ($type: MediaType, $sort: [MediaSort]) {
            Page {
                media(sort: $sort, type: $type) {
                    id
                    title {
                        english
                        native
                    }
                    coverImage {
                        large
                    }
                    description
                }
            }
        }
    `;

    const { data } = await client.query({
        query: query,
        variables: variables,
    });
    
    return {
        props: {
            variables: {type: type, sort: sort},
            media: data.Page.media
        }
    }
}

export default function Media({variables, media}) {
    return (
        <section class="section">
            <h1 class="subtitle">
                type: {variables.type} sort: {variables.sort}
            </h1>
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
            pathname:"/media_detail",
            query: { data: JSON.stringify(data) }
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
                            <strong>{data.title.english ? data.title.english : data.title.native}</strong>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}

