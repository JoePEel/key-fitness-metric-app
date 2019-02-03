import React, { Component } from 'react';

class Login extends Component {


render(){
    return (
        <div className="h-screen bg-blue-light flex items-center">
            <div className="flex-1 bg-white rounded-lg m-8 p-2  ">
                <h1 className="py-8">Fitness Stats Tracker</h1>
                <p className="pb-12 text-lg">Log and monitor your progress on lifts, runs, swims and anything you can think of!</p>
                <div className="pb-12">
                    <button
                        className="bg-red-light py-4 px-12 rounded  text-large"
                    >
                        <a className="text-white no-underline font-semibold" href='http://localhost:3000/auth/google'>Login with Google</a>
                    </button>
                </div>
            </div>
        </div>
    )
}

}

export default Login;