import React from 'react';

const AccountTile = (props) => {
  return (
    <div value={props.id} className="account-tile">{props.name}</div>
  )
}

export default AccountTile;
