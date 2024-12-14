import "./dungeonShortcuts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DungeonShortcuts = ({ character, setCharacter, setIsAlleyDialog, setIsArenaDialog, closeAllDialogs }) => {

    const navigate = useNavigate();
    const backToWorld = () => { navigate('/world'); };

    return (
        <div key="row dungeon-shortcuts">
            <div className="col-10 dungeon-shortcut" onClick={() => { closeAllDialogs(); setIsAlleyDialog(true) }}>
                <h5>Explorar torre <img src="../../world/icons/ancientTower.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 dungeon-shortcut" onClick={() => { closeAllDialogs(); setIsAlleyDialog(true) }}>
                <h5>Explorar pântano <img src="../../world/icons/swamp.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 dungeon-shortcut" onClick={backToWorld}>
                <h5>Voltar <img src="../../world/icons/back.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
            </div>
        </div>
    );
};

export default DungeonShortcuts;