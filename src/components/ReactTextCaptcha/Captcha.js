import React, { useState, useEffect } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
export default function Captcha() {
    const [user, setUser] = useState({
        username: ""
    });
    const [captcha, setCaptcha] = useState("");
    const characters = 'abc123';
    useEffect(() => {
        generateString(6);
    }, []);
    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setCaptcha(result);
        //return result;
    }
    const generatenewcode = () => {
        generateString(6);
    }
    //const captcha = generateString(6) // Function called here and save in captcha variable
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        user[name] = value;
        setUser(user);
    }
    const onSubmit = e => {
        var element = document.getElementById("succesBTN");
        var inputData = document.getElementById("inputType");
        element.style.cursor = "wait";
        element.innerHTML = "Checking...";
        inputData.disabled = true;
        element.disabled = true;
        var myFunctions = function () {
            if (captcha == user.username) {
                element.style.backgroundColor = "green";
                element.innerHTML = "Captcha Verified";
                element.disabled = true;
                element.style.cursor = "not-allowed";
                //inputData.style.display = "none";
            }
            else {
                element.style.backgroundColor = "red";
                element.style.cursor = "not-allowed";
                element.innerHTML = "Not Matched";
                element.disabled = true;
                //  element.disabled = true;
                var myFunction = function () {
                    element.style.backgroundColor = "#007bff";
                    element.style.cursor = "pointer";
                    element.innerHTML = "Verify Captcha";
                    element.disabled = false;
                    inputData.disabled = false;
                    inputData.value = 'sssss';
                };
                setTimeout(myFunction, 5000);
            }
        }
        setTimeout(myFunctions, 5000);
    };

    return (
        <>
            <div class="container">
                <div class="agent_pop_main">
                    <div class="">
                    </div>
                    <div class="menu_opt_sec">
                        <div class="mar_top row">
                            <div class="col-md-4">
                                verify
                            </div>
                            <div class="col-md-8">
                                <input type="text" id="inputType" className="form-control" placeholder="Enter Captcha"
                                    name="username" onChange={handleChange} autocomplete="off"
                                />
                            </div>
                        </div>
                        <div class="mar_top row">
                            <div class="col-md-8">
                                <h4 id="captcha" style={{ margin: "10px" }}>{captcha}</h4>
                                <button id="succesBTN" onClick={generatenewcode} class="btn btn-primary ml-1" style={{ backgroundColor: "#ffa12d", borderStyle: "none" }}>regenerate</button>
                            </div>
                            <div class="col-md-8">
                                <button type="button" id="succesBTN" onClick={onSubmit} class="btn btn-primary ml-1" style={{ backgroundColor: "#ffa12d", borderStyle: "none" }}>Verify Captcha</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
