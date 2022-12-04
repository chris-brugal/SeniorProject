import React, {useEffect, useState} from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Dialog, DialogTitle, Popover, Paper, DialogContent } from "@mui/material";

    

    export default function ArtistPopup({ code, artist, open, onClose }) {

        const accessToken = useAuth(code);
        const {songTable, setSongTable} = useState([])
        const {aartist, setAartist} = useState();
    
        useEffect(() => {
            console.log("useeffect has popped")
            if(accessToken){
            console.log("Fetching artist top songs")
            return axios.get("http://localhost:8000/getArtistTopTracks", {
                'Access-Control-Allow-Origin': 'http://localhost:8000',
                'id': aartist.id
            })
            .then((response) => {
                console.log("ARTIST SONG ARTIST SONG")
                console.log(response);
                setSongTable(response.data.items);
            })
            }

            if(aartist){
                setAartist(artist);
            }

        }, []);

        const handleClose = () => {
            onClose()
        }

        if(artist){
            console.log(artist);
            return (
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle> {artist.name} </DialogTitle>

                    <Card sx={{w: 400}} autoFocus onClick={handleClose}>
                        <CardMedia 
                                component="img"
                                sx={{height: 400, width: 400, pr: "2%" }}
                                alt="artist img"
                                image={artist != null && artist.images[0].url}
                                />
                        <CardContent sx={{w: 400}}>

                        </CardContent>
                    </Card>
                    <DialogContent>
                        {
                            songTable.map( (song, index) => (
                            <Paper elevation={0}>
                                <Typography variant="body1" key={song.id}
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                sx = {{p:0.5}}
                                >
                                {index+1}. {song.name}
                                </Typography>
                            </Paper>
                        ))}
                    </DialogContent>
                </Dialog>
            );
        } else {
            return(<div/>);
        }
    }
