import parse from "html-react-parser";
import { useRouter } from 'next/router';

export default function CharacterDetail() {
    const router = useRouter();
    const data = JSON.parse(router.query.data);
    
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

