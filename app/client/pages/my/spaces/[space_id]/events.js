import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/events.module.scss";
import { useRouter } from 'next/router'
import { API_URL, google_maps_api_key } from "../../../../next.config";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../../components/Button/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import MapPicker from 'react-google-map-picker';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Masonry from 'react-masonry-css';
import { Avatar } from "@mui/material";
import { useGeolocated } from "react-geolocated";


export default function resources() {
    const router = useRouter();
    let router_query = router.query;
    const [data, setData] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [selectedLocaiton, setSelectedLocaiton] = useState(null);
    const [userId, setUserId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const DefaultLocation = { lat: 10, lng: 106 };
    const DefaultZoom = 15;

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    const ref = useRef(null);

    const breakpointColumnsObj = {
        default: 3,
        1250: 2,
        950: 1
    };

    const getLocation = () => {
        if (!navigator.geolocation) {
          //setStatus('Geolocation is not supported by your browser');
        } else {
          //setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setDefaultLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
          });
        }
      }

    const SignupSchema = Yup.object().shape({
        eventName: Yup.string()
            .min(2, "Too Short")
            .max(50, "Too Long")
            .required("Required"),
        eventDescription: Yup.string()
            .min(2, "Too Short")
            .max(50, "Too Long")
            .required("Required"),
        eventTime: Yup.string().required("Required")
    });

    async function fetchContent() {
        try {
            if (router_query?.space_id !== undefined) {

                const response = (
                    await axios.get(API_URL + "/space/getAllEvents/" + router_query.space_id)
                );

                setData(response?.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchContent();


        const user_id = localStorage.getItem("user_id");

        setUserId(user_id);
        getLocation();
    }, [router_query]);

    function createEventClicked() {
        //setDefaultLocation({ lat: coords?.latitude, lng: coords?.longitude });
        setCreateOpen(true);
    }

    function saveEventClicked() {
        setCreateOpen(true);
    }

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    async function joinEvent(event) {
        const response = (
            await axios.post(API_URL + "/event/participate/" + selectedLocaiton._id)
        );

        setLocationOpen(false);
        fetchContent();
    }

    async function unjoinEvent(event) {
        const response = (
            await axios.post(API_URL + "/event/unparticipate/" + selectedLocaiton._id)
        );

        setLocationOpen(false);
        fetchContent();
    }

    const handleSubmit = async (v) => {
        const body = {
            space_id: router_query.space_id,
            description: ref.current.values.eventDescription,
            start_date: startDate,
            end_date: endDate,
            quota: ref.current.values.quota,
            event_title: ref.current.values.eventName,
            location: {
                latitude: location.lat,
                longitude: location.lng
            }
        }

        try {
            await axios.post(API_URL + "/event", body);
            fetchContent();
            setCreateOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.eventsHeader}>
                <div>
                    <h2>{data?.space?.name}</h2>
                    <h1>Events</h1>
                </div>


                <Button onClick={createEventClicked} className={styles.eventsHeaderButton}>Create an Event</Button>
            </div>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    data?.map((event, index) =>
                        <div key={event._id} className={styles.eventCard} onClick={(e) => { setLocationOpen(true); setSelectedLocaiton(event) }}>
                            <div className={styles.eventCardBlocker}></div>
                            <div className={styles.eventCardInfo}>
                                <h3 className={styles.courseCardTitle}>{event.event_title}</h3>
                                <div className={styles.eventCardMapConatiner}>
                                    <MapPicker defaultLocation={{ lng: event.location.longitude, lat: event.location.latitude }}
                                        zoom={15}
                                        mapTypeId="roadmap"
                                        style={{ height: '500px', width: '100%', position: "absolute", left: "0px", top: "-100px", z_index: -20 }}
                                        apiKey={google_maps_api_key}
                                        disabled />
                                </div>
                                <div className={styles.eventCardFooter}>
                                    <span>{event.participant_count} people have already joined in!</span>
                                    {event?.participants.includes(userId) && <span className={styles.eventJoined}>You have already joined in!</span>}
                                </div>
                            </div>
                        </div>

                    )
                }
            </Masonry>

            <Dialog className={styles.dialog} open={createOpen} maxWidth={false} fullWidth={true} onClose={() => setCreateOpen(false)}>
                <DialogTitle>Create an Event</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            eventName: "",
                            eventDescription: "",
                            endDate: "",
                            startDate: "",
                            quota: ""
                        }}
                        innerRef={ref}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}>
                        {({ errors, touched }) => (
                            <Form className={styles.form}>
                                <div className={styles.createEventFormList}>
                                    <Field
                                        id="eventName"
                                        name="eventName"
                                        type="text"
                                        placeholder="Evet Name"
                                        className={styles.input}
                                    ></Field>
                                    {errors.name && touched.name && (
                                        <div className={styles.error}>
                                            {errors.name}
                                        </div>
                                    )}


                                    <Field
                                        name="startDate"
                                        render={({ field, form: { isSubmitting } }) => (
                                            <Datetime
                                                onChange={(d) => { setEndDate(new Date(d)) }}
                                                id="startDate"
                                                placeholder="HH/MM DD/MM/YYYY"
                                                className={styles.dateTime} />
                                        )}
                                    />

                                    <Field
                                        name="endDate"
                                        render={({ field, form: { isSubmitting } }) => (
                                            <Datetime
                                                onChange={(d) => { setStartDate(new Date(d)) }}
                                                id="endDate"
                                                placeholder="HH/MM DD/MM/YYYY"
                                                className={styles.dateTime} />
                                        )}
                                    />

                                    <Field
                                        id="quota"
                                        name="quota"
                                        type="number"
                                        placeholder="Quota"
                                        className={styles.input}
                                    ></Field>

                                </div>

                                <Field
                                    id="eventDescription"
                                    name="eventDescription"
                                    type="text"
                                    placeholder="Event Description"
                                    className={styles.input}
                                ></Field>
                                {errors.surname && touched.surname && (
                                    <div className={styles.error}>
                                        {errors.surname}
                                    </div>
                                )}

                                <MapPicker defaultLocation={defaultLocation}
                                    zoom={zoom}
                                    mapTypeId="roadmap"
                                    style={{ height: '500px' }}
                                    onChangeLocation={handleChangeLocation}
                                    onChangeZoom={handleChangeZoom}
                                    apiKey={google_maps_api_key} />


                                <Button type="submit" onClick={handleSubmit} className={styles.saveEventButton}>Save</Button>

                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>


            <Dialog className={styles.dialog} open={locationOpen} maxWidth={false} fullWidth={false} onClose={() => setLocationOpen(false)}>
                <DialogTitle>{selectedLocaiton?.event_title}</DialogTitle>
                <DialogContent>
                    <MapPicker defaultLocation={{ lng: selectedLocaiton?.location.longitude, lat: selectedLocaiton?.location.latitude }}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{ height: '400px', width: '400px' }}
                        onChangeLocation={handleChangeLocation}
                        onChangeZoom={handleChangeZoom}
                        apiKey={google_maps_api_key} />

                    <div className={styles.locationDialogFooter}>
                        <div className={styles.locationDialogCreator}>
                            <Avatar alt="Agnes Walker" src={data?.resource?.creatorimage} />
                            <span className={styles.locationDialogFooterName}>{selectedLocaiton?.creator.name} </span>
                            <span className={styles.locationDialogFooterName}>{selectedLocaiton?.creator.surname}</span>
                        </div>
                        <div className={styles.locationDialogDescription}>{selectedLocaiton?.description}</div>
                        <div>
                            <span>{new Date(selectedLocaiton?.start_date).toDateString()}</span>
                            -
                            <span>{new Date(selectedLocaiton?.end_date).toDateString()}</span>
                        </div>
                        <div> {selectedLocaiton?.participant_count} / {selectedLocaiton?.quota} spots are full.</div>
                    </div>

                    {selectedLocaiton?.participants.includes(userId) && <Button type="submit" onClick={unjoinEvent} className={styles.unjoinButton}>Unjoin</Button>}
                    {!selectedLocaiton?.participants.includes(userId) && <Button type="submit" onClick={joinEvent} className={styles.saveEventButton}>Join</Button>}
                </DialogContent>
            </Dialog>
        </section >
    );
}

resources.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
