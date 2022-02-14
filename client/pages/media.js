import { gql } from "@apollo/client";
import client from "../apollo-client";
import parse from "html-react-parser";

export async function getServerSideProps(context) {
    const id = context.query.id;
    const { data } = await client.query({
        query: gql`
        query ($id: Int) {
            Media (id: $id) { 
              id
              title {
                english
              }
              coverImage {
                large
              }
              description
            }
          }
        `,
        variables: {
            id: id
        }
    });

    return {
      props: {data: data.Media}
    }
}

export default function Media({data}) {
    return (
        <section class="section">
          <div class="columns">
            <div class="column is-narrow">
              <figure>
                <img src={data.coverImage.large} width="200" height="300" />
              </figure>
            </div>
            <div class="column">
              <p>
                <strong>{data.title.english}</strong>
                <br />
                {parse(data.description)}
              </p>
            </div>
          </div>
        </section>
    )
}

