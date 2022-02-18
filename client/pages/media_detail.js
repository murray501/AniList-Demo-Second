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

    const goReview = () => {
      router.push({
          pathname:"/review",
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
                  <br />
                </p>
                <Genres data={data} />
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <button class="level-item button is-small" onClick={goCharacter}>Characters</button>
                  <button class="level-item button is-small" onClick={goReview}>Reviews</button>
                  <a href={data.siteUrl} class="level-item button is-small">SiteUrl</a>
                </div>
              </nav>
            </div>
            <Trailer data={data} />
          </div>
        </section>
    )
}

function Genres({data}) {
  return (
    <div class="is-small">
      <strong>Genres: </strong>{data.genres.join()}
    </div>
  )
}

function Trailer({data}) {
  if (data.trailer) {
    if (data.trailer.site == "youtube") {
      return (
        <div class="column">
          <figure class="image is-4by3">
            <iframe class="has-ratio" width="480" height="360" src={"https://www.youtube.com/embed/" + data.trailer.id} frameborder="0"></iframe>
          </figure>
        </div>
      )
    }
  } 
  return (<></>);
}