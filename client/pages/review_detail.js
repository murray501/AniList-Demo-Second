import { gql } from "@apollo/client";
import client from "../apollo-client";
import parse from "html-react-parser";
import { useRouter } from 'next/router';

export default function ReviewDetail() {
    const router = useRouter();
    const data = JSON.parse(router.query.data);
    
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
