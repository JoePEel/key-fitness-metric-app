import React from 'react';

const TopBar = (props) => {
    return (
        <div className="w-full flex flex-row justify-between bg-grey-lighter p-y2 items-center">
            <p className="mx-4 font-semibold">
                Gym Stats Tracker
            </p>
            <button 
                className="bg-red py-1 px-2 my-1 mx-4 rounded text-white"
                onClick={props.logout}
            >
                Logout
            </button>
        </div>
    )
}


export default TopBar