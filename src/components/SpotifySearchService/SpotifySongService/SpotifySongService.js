import React, { useEffect, useState } from "react";
import SearchForm from "./SpotifySearchService/SearchForm";


const SpotifySongService = () => {
    const [searchAction, setSearchAction] = useState("");
    const [showForm, setShowForm] = useState(false);

    const getSong = async (searchTerm) => {
        try {
            const response = await fetch(`http://localhost:8080/songs/get/${searchTerm}`);
            setSearchAction("Buscar");

            if (response.ok) {
                console.log("Endpoint builded", response);
                console.log(response.json());
            } else if (response.status === 404){
                console.error("La canción no existe!", response.status);
            }
            else{
                console.error("Aun no has iniciado sesion en Spotify o tu sesion ya expiró")
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const handleGetSongClick = () => {
        setSearchAction("Buscar");
        setShowForm(true);
    };

    const handleSaveSongClick = () => {
        setSearchAction("Guardar");
        setShowForm(true);
    };

    return (
        <div className="child-container">

             <h2>{searchAction} Canciones</h2> 

             <SearchForm 
                onSearch={getSong}
            
            />

            <div className="buttons-song-service">
                <button type='button' className="btn btn-primary" onClick={handleGetSongClick}>Buscar Canciones</button>
                <button type='button' className="btn btn-warning" onClick={handleSaveSongClick}>Guardar Canciones</button>
            </div>
{/*              
            {showForm && (<SongSearchForm onSearch={searchAction === "Buscar" ? getSong : saveSong} 
                 buttonText={searchAction === "Buscar" ? "Buscar" : "Guardar"} />)
            } */}
            
        </div>
    );
};

export default SpotifySongService;