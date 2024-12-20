import React, { useState } from 'react';
import { useItemInfo } from '/src/context/ItemInfoContext';

const ItemBox = ({ item, inventoryId, equipItem, equiped }) => {

    const { openItemInfoDialog, closeItemInfoDialog } = useItemInfo();

    const itemGradientStyle = {
        '--item-gradient': `radial-gradient(circle, ${item.tier.background} 20%, rgba(66, 66, 66, 0.01) 85%)`
    };
    equiped = equiped === 1 ? equiped : 0;

    return (
        <div
            className="col item-box d-flex justify-content-center"
            onMouseEnter={openItemInfoDialog ? () => openItemInfoDialog(item, equiped) : null}
            onMouseLeave={closeItemInfoDialog ? () => closeItemInfoDialog() : null}
            onDoubleClick={equipItem && inventoryId ? () => equipItem(inventoryId, equiped) : null}
            style={{ cursor: 'pointer', borderColor: item.tier.background }}
        >
            {equiped === 1 && (
                <span className="position-absolute badge rounded-pill bg-primary">
                    <i className="bi bi-bookmark-star"></i>
                </span>
            )}

            <img
                className="img-fluid"
                src={`/${item.image}`}
                alt="Item image"
                style={itemGradientStyle}
            />
        </div>
    );
};

export default ItemBox;