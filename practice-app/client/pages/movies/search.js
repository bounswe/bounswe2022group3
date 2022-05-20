import { Formik, Form, Field } from "formik";
import Button from "../../components/Button/Button";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";

export default function search() {
    const router = useRouter();

    const SearchSchema = Yup.object().shape({
        keyword: Yup.string().required("Required")
    });

    const handleSubmit = async (values) => {
        localStorage.setItem("keyword", values.keyword)
        router.push(`/movies/results?keyword=${values.keyword}`)
    };

    return (
        <>
            <h1>Search</h1>
            <h2>Search for a movie title or click the button below to reach the watchlist feature.</h2>
            <Formik
                initialValues={{
                    keyword: ""
                }}
                validationSchema={SearchSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <Field
                            id="keyword"
                            name="keyword"
                            type="text"
                            placeholder="Keyword"
                        ></Field>
                        <Button type="submit">Search</Button>
                        <div>
                            <Link href="/list">
                                Watchlist
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}