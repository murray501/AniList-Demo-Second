import { gql } from "@apollo/client";
import client from "../apollo-client";
import parse from "html-react-parser";
import { useRouter } from 'next/router';

export default function MediaDetail() {
    const router = useRouter();
    const data = JSON.parse(router.query.data);
    
    const goCharacter = () => {
      router.push({
          pathname:"/character",
          query: { id: data.id }
      })
    }

    return (
        <section class="section">
          <div class="columns">
            <div class="column is-narrow">
              <figure>
                <img src={data.coverImage.large} width="200" height="300" />
              </figure>
            </div>
            <div class="column">
              <div class="content">
                <p>
                  <strong>{data.title.english ? data.title.english : data.title.native}</strong>
                  <br/>
                  {parse(data.description)}
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <button class="level-item button is-small" onClick={goCharacter}>Characters</button>
                </div>
              </nav>
            </div>
          </div>
        </section>
    )
}

