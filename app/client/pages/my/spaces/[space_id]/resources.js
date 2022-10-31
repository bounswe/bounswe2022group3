import { Box, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { IconContext } from "react-icons";
import { AiOutlineFilePdf } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoMdImage } from "react-icons/io";
import MainLayout from "../../../../layouts/main/MainLayout";
import styles from "../../../../styles/my/resources.module.scss";

const chapters = [
    {
        'id': '634cde32693cd0c82806e64c',
        'chapter_name': 'Guitar chords',
        'resources': ['playing first song', 'Chords', 'About guitars']
    },
    {
        'id': '634cde8a9dbd91c3a2c97324',
        'chapter_name': 'Strumming',
        'resources': ['practice music', 'Strumming patterns', 'palm muting technique']
    },
    {
        'id': '634cde8fc2f25e1a7694d2f6',
        'chapter_name': 'Beginner blues',
        'resources': ['how to apply turnaround', '12 bar blues', 'Classical vs Western acoustic guitars']
    }
]

export default function resources() {
    function Other(desc) {
        return (
            <a>
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "#4d77eb" }}>
                        <HiOutlineDocumentText size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>);
    }
    function Image(desc) {
        return (
            <a>
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "#3cbd5a" }}>
                        <IoMdImage size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>
        );
    }
    function Pdf(desc) {
        return (
            <a>
                <Grid style={{
                    width: '100%', display: 'flex',
                    flexWrap: 'wrap', margin: 12
                }}>
                    <IconContext.Provider value={{ color: "red" }}>
                        <AiOutlineFilePdf size={20} />
                    </IconContext.Provider>
                    <h4> {desc}</h4>
                </Grid>
            </a>

        );
    }

    return (
        <section className={styles.container}>
            <h2>Acoustic Guitar Ed for Beginners</h2>
            <h1>Resources</h1>
            <Grid container spacing={2} style={{ marginBottom: 12 }}>
                <Grid item sx={{ width: '80%', paddingLeft: "4px !important", paddingTop: "4px !important" }}>
                    <Table sx={{ minWidth: 250 }} >
                        <TableBody>
                            {chapters.map((chapter, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell>
                                            <Box>
                                                <h3 > {chapter.chapter_name}</h3>

                                                {Other(chapter.resources[0])}
                                                {Image(chapter.resources[1])}
                                                {Pdf(chapter.resources[2])}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        </section>
    );
}

resources.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
