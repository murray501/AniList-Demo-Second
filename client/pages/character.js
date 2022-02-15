import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const id = context.query.id;
    const { data } = await client.query({
        query: gql`
        query ($id: Int) {
          Media(id: $id){
            characters(sort: ROLE) {
              nodes {
                id
                name {
                  first
                  last
                }
                image {
                  large
                  medium
                }
                gender
                age
                siteUrl
                description
              }
            }
          }
        }
        `,
        variables: {
            id: id
        }
    });

    return {
      props: {characters: data.Media.characters.nodes}
    }
}

export default function Character({characters}) {
  return (
    <section class="section">
         <div class="columns is-multiline">
            {characters.map(x => <EachCharacter data={x} />)}                 
         </div>
    </section>      
  )
}

function EachCharacter({data}) {
  const router = useRouter();
  const goDetail = () => {
    router.push({
        pathname:"/character_detail",
        query: { data: JSON.stringify(data) }
    })
  }

  return (
      <div class="column is-6-tablet is-4-desktop is-3-widescreen">
          <article class="box">
              <div class="media">
                  <div class="media-content">
                      <figure>
                          <img src={data.image.large} width="200" height="300" onClick={goDetail}/>
                      </figure>
                      <p>
                          <strong>{data.name.first} {data.name.last}</strong>
                      </p>
                  </div>
              </div>
          </article>
      </div>
  )
}

