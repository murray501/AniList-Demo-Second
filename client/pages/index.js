export default function Index() {
    const submit = () => {
        e.preventDefault();
    };

    return (
        <section class="hero">
            <div class="hero-body">
                <p class="title">
                    Demo: AniList
                </p>
                <form onSubmit={submit}>
                    <div class="field">
                        <label class="label">Choose Anime or Manga</label>
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="anime_manga" value="anime" checked/>
                                    Anime
                            </label>
                            <label class="radio">
                                <input type="radio" name="anime_manga" value="manga" />
                                    Manga
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Sort by</label>
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="sortby" value="popularity" checked/>
                                    Popularity
                            </label>
                            <label class="radio">
                                <input type="radio" name="sortby" value="trending" />
                                    Trending
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <button class="button is-success">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}