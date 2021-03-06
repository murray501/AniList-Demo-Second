import { useState } from "react";
import { useRouter } from "next/router";

export default function Index() {

    const router = useRouter();

    const [value, RadioProp] = createRadioButton(["ANIME", "MANGA"],"Choose Anime or Manga");
    const [value2, RadioProp2] = createRadioButton(["POPULARITY", "TRENDING","FAVOURITES", "SCORE"], "Sort By");                
                    
    const submit = () => {
        router.push({
            pathname: "/media",
            query: {type: value, sort: value2}
        })
    };

    return (
        <section class="section">
            <h1 class="title">AniList</h1>
            {RadioProp}
            {RadioProp2}
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" onClick={submit}>Submit</button>
                </div>
            </div>
        </section>
    )
}

function createRadioButton(values, label) {
    const [value, setValue] = useState(values[0]);

    const handleChange = e => {
        setValue(e.target.value);
    }

    return([
        value, 
        (<div class="field">
            <label class="label">{label}</label>
            <div class="control">
                {
                    values.map (x => 
                        <label class="radio">
                        <input type="radio" value={x} onChange={handleChange} checked={value === x} />
                            {x}
                        </label>
                    )
                }
            </div>
        </div>)
    ])
}