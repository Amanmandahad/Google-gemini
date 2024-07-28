import { createContext, useState } from "react";
import { run } from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setinput] = useState("");
    const [recentprompt, setrecentprompt] = useState("");
    const [previousprompt, setpreviousprompt] = useState([]);
    const [showresult, setshowresult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultdata, setresultdata] = useState("");

    // Function for handling sending of prompt
    const onSent = async () => {
        if (!input.trim()) {
            // Handle empty input case
            alert("Please enter a prompt");
            return;
        }
        
        setresultdata('');
        setloading(true);
        setshowresult(true);
        setrecentprompt(input);
        setpreviousprompt(prev=>[...prev,input]);
        
        try {
            const response = await run(input);
            let responsearray = response.split("**");
            let newresponse = "";
            for (let i = 0; i < responsearray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newresponse += responsearray[i];
                } else {
                    newresponse += "<b>" + responsearray[i] + "</b>";
                }
            }
            setresultdata(newresponse);
        } catch (error) {
            console.error("Error fetching data:", error);
            setresultdata("An error occurred while fetching data.");
        } finally {
            setloading(false);
            setinput("");
        }
    };

    const contextvalue = {
        previousprompt,
        setpreviousprompt,
        onSent,
        setrecentprompt,
        recentprompt,
        showresult,
        loading,
        resultdata,
        input,
        setinput
    };

    return (
        <Context.Provider value={contextvalue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
