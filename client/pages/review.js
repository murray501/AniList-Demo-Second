import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const id = context.query.id;
    const { data } = await client.query({
        query: gql`
        query ($id: Int) {
          Media(id: $id){
            reviews(sort: CREATED_AT_DESC) {
              nodes {
                id
                summary
                user {
                  name
                }
                siteUrl
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
      props: {reviews: data.Media.reviews.nodes}
    }
}

export default function Review({reviews}) {
  return (
    <section class="section">
      {reviews.map(x => <EachReview data={x} />)}
    </section>      
  )
}

function EachReview({data}) {
  
  const router = useRouter();
  const goDetail = () => {
    router.push({
        pathname:"/review_detail",
        query: { id: data.id }
    })
  }

  if (data.private) {
    return <></>
  }

  return (
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{data.user.name}</strong>
            <br />
            {data.summary}
          </p>
        </div>
        <nav class="level is-mobile">
            <div class="level-left">
              <button class="level-item button is-small" onClick={goDetail}>Detail</button>
              <a href={data.siteUrl} class="level-item button is-small">SiteUrl</a>
            </div>
        </nav>
      </div>
    </article>
  )
}
