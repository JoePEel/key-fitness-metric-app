import React from 'react'

const DeleteModal = (props) => {

    return (
        <div className="mt-4">
            <p>{`Are you sure you want to delete ${props.name} and all it's data?`}</p>
            <div className="flex flex-row text-center pt-3 justify-center">
                <button 
                    className="bg-white shadow rounded mr-4 py-2 px-4"
                    onClick={props.cancel}
                >
                    Cancel
                </button>
                <button 
                    className="bg-red text-white rounded mr-4 py-2 px-4"
                    onClick={props.delete}
                >
                    Delete
                </button>
            </div>
        </div>
    )

}

export default DeleteModal

