import { gql } from "@apollo/client";
import client from "../apollo-client";
import parse from "html-react-parser";
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const id = context.query.id;
  const query = gql`
    query($id: Int) {
      Review(id: $id) {
        id
        body(asHtml: true)
        user {
          name
        }
      }
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
          id: id
      }
  });

  return {
    props: {data: data.Review}
  }
}

export default function ReviewDetail({data}) {    
    return (
      <section class="section">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{data.user.name}</strong>
                <br />
                {parse(data.body)}
              </p>
            </div>
          </div>
        </article>
      </section>
    )
}
