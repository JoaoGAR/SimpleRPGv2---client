import React, { useState } from 'react';

const ItemInfoDialog = ({ item, mousePosition, isOpen, onClose, equiped, diffx, diffy }) => {

    if (!isOpen) return null;

    return (
        <div className="item-info"
            style={{
                position: 'absolute',
                top: mousePosition.y - diffy,
                left: mousePosition.x - diffx,
                zIndex: 1005,
                border: `1px outset ${item.tier?.background}`,
            }}
        >
            <div className="col-12 badge text-uppercase" style={{ backgroundColor: item.tier?.background, color: item.tier?.color }}>
                <img style={{ width: '20px' }} src={"../" + item.icon} alt="Item icon" />
                {item.name}
                {equiped === 1 && (
                    <span className="badge rounded-pill bg-primary">Equiped</span>
                )}
            </div>
            <div className="row">
                {item.categoryId === 7 && (
                    <span><img style={{ height: '20px', width: '20px' }} src='../world/d20w.svg' /> {item.attack ? item.attack : item.minAttack + '-' + item.maxAttack}</span>
                )}
                {item.armorClass > 0 && (
                    <span><img style={{ height: '20px', width: '20px' }} src='../icons/items/shield.svg' /> {item.armorClass}</span>
                )}
            </div>
            <div className="col-12">
                <p>{item.description}</p>
            </div>
            <div className="row row-cols-4 item-skills">
                {typeof item.skills !== "undefined" && item.skills.map((itemSkill) => {
                    return (
                        <div key={itemSkill.id} className="col-2">
                            <div className="skill-img" style={{ backgroundImage: `url("${itemSkill.skill.icon}")` }}>
                                <p className="skill-level fw-bolder">{itemSkill.level}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="row item-skills">
                <table className="table table-dark">
                    <tbody>
                        {typeof item.abilities !== "undefined" && item.abilities.map((itemAbility) => {
                            const abilityTypeIcon = itemAbility.ability.typeId == 1 ? <img style={{ height: '20px', width: '20px' }} src='../world/d20w.svg' /> : <img style={{ height: '20px', width: '20px' }} src='../icons/items/shield-w.svg' />
                            return (
                                <tr key={itemAbility.id} className="row">
                                    <td><img className="ability-img" style={{ height: '30px', width: '30px' }} src={itemAbility.ability.icon} /></td>
                                    <td>{itemAbility.ability.name}</td>
                                    <td>
                                        {abilityTypeIcon} {itemAbility.ability.attack}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemInfoDialog;