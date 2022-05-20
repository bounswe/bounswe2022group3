import { Formik, Form, Field } from "formik";
import Button from "../../components/Button/Button";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../next.config";
import { useRouter } from "next/router";

export default function add() {
    const router = useRouter();

    const WatchlistSchema = Yup.object().shape({
        title: Yup.string().required("Required")
    });

    const handleSubmit = async (values) => {
        try {
            console.log(values)
            const email = localStorage.getItem("email")
            const url = `${API_URL}/movies/add?title=${values.title}&email=${email}`;
            const response = await axios.post(url);

            if (response.status == 201) { // Search returned
                router.push('/movies/list')
            } else{
                console.log(response.message);
            }
        } catch (error) {
            routes.push('/movies/search')
        }
    };

    return (
        <>
            <h1>Watchlist</h1>
            <p>Add a movie to your watchlist by providing its movie title.</p>
            <Formik
                initialValues={{
                    title: ""
                }}
                validationSchema={WatchlistSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <Field
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                        ></Field>
                        <Button type="submit">Add to watchlist</Button>
                        <div>
                            <Link href="/movies/list">
                                Watchlist
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}