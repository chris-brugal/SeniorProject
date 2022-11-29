import React, {useEffect, useState} from "react";
import useAuth from "./useAuth.js";
import axios from "axios";
import { Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Dialog, DialogTitle, Popover, Paper } from "@mui/material";

    

    export default function ArtistPopup({ code, artist, open, onClose }) {

        const accessToken = useAuth(code);
        const {songTable, setSongTable} = useState([])
        const {aartist, setAartist} = useState();
    
        useEffect(() => {
            if(accessToken){
                return axios.get("http://localhost:8000/getArtistTopTracks", {
                'Access-Control-Allow-Origin': 'http://localhost:8000',
                'id': aartist.id
            })
            .then((response) => {
            console.log(response);
            setSongTable(response.data.items);
            })
            }

            if(aartist){
                setAartist(artist);
            }

        }, [accessToken]);

        const handleClose = () => {
            onClose(artist)
        }

        if(artist){
            console.log(artist);
            return (
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle> {artist.name} </DialogTitle>

                    <Card sx={{w: 300}} autoFocus onClick={handleClose}>
                        <CardMedia 
                                component="img"
                                sx={{height: 400, width: 400, pr: "2%" }}
                                alt="artist img"
                                image={artist != null && artist.images[0].url}
                                />
                        <CardContent sx={{w: 330}}>
                        </CardContent>
                    </Card>
                    
                </Dialog>
            );
        } else {
            <div/>
        }
    }