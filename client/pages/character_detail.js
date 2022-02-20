import { gql } from "@apollo/client";
import client from "../apollo-client";
import parse from "html-react-parser";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const query = gql`
    query($id: Int) {
      Character(id: $id) {
        id
        name {
          first
          last
        }
        image {
          large
        }
        gender
        age
        siteUrl
        description
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
    props: {data: data.Character}
  }
}

export default function CharacterDetail({data}) {
    return (
        <section class="section">
          <div class="columns">
            <div class="column is-narrow">
              <figure>
                <img src={data.image.large} width="200" height="300" />
              </figure>
            </div>
            <div class="column">
              <div class="content">
                <p>
                  <strong>{data.name.first} {data.name.last}</strong>
                  <br />
                  {parse(data.description)}
                </p>
              </div>
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <strong>Gender: </strong>{data.gender}
                  </div>
                  <div classs="level-item">
                    <strong>Age: </strong>{data.age}
                  </div>
                </div>
                <div class="level-right">
                    <a href={data.siteUrl} class="button is-small">SiteUrl</a>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}

