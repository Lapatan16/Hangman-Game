import "./hangman.css"
import { useState, useEffect } from 'react'

function Hangman()
{
    const [mainWord, setMainWord] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [gameValue, setGameValue] = useState("");
    const [win, setWin] = useState("");
    const [help, setHelp] = useState("");
    const [corectWords, setCorectWords] = useState([""]);
    const [strike, setStrike] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const imageString = `../public/${strike}.png`;

    function newGame()
    {
        location.reload();
    }

    function HandleStartGameKeyUp(event)
    {
        if(event.key === "Enter")
            submitHandler();
        
    }

    function HandleGuessKeyUp(event)
    {
        if(event.key === "Enter")
            guess();
    }
    
    useEffect(() => 
    {   
        if(strike > 5)
        {
            setGameStarted(false);
            setEnd("You lost!")
            setHelp(mainWord.split("").join(" "));
        }
    }, [strike])

    useEffect(() => {        
        if(help != "" && gameStarted && help.split(" ").join("") == mainWord)
        {
            setGameStarted(false);
            setEnd("You won!");
        }
    }, [help])

    function incrementStrike()
    {
        setStrike(s => s + 1);
    }

    function handleHelp(event)
    {
        if(!gameStarted)
            return;
        let word = event.target.value;
        event.target.disabled = true;
        if(mainWord.includes(word))
        {
            setCorectWords(c => [...c, word]);
            let words = corectWords.slice();
            words.push(word)
            checkWords(words)
        }
        else
            incrementStrike();
    }

    function setEnd(end)
    {
        setWin(end);
        const butt = document.createElement("button");
        butt.class = "interact-button";
        butt.onclick = () => newGame();
        butt.innerText = "New game";
        document.getElementById("guessing-div").appendChild(butt);
    }

    function handleGameChange(event)
    {
        setGameValue(event.target.value);
    }

    function submitHandler()
    {
        startGame();
    }

    function handleInputChange(event)
    {
        setInputValue(event.target.value);
    }

    function makeDashes(n)
    {        
        let s = "_";
        for(let i = 1; i < n; i++)
            s = s + " _";
        
        setHelp(s);    
    }

    function startGame()
    {
        if(inputValue == "")
            return;
        setGameStarted(true);
        setMainWord(inputValue.toLowerCase());
        makeDashes(inputValue.length)
        setInputValue("");
    }

    function guess()
    {
        if(!gameStarted)
            return;
        const value = gameValue;
        setGameValue("");
        if(mainWord === value)
        {
            setEnd("You won!");
            setGameStarted(false);
            setHelp(mainWord.split("").join(" "));
        }
        else
        {
            incrementStrike();
        }
    }

    function checkWords(words)
    {
        let sentence = mainWord.split("");
        
        for(let i = 0; i < sentence.length; i++)
        {
            let ind = 0;
            for(let j = 0; j < words.length; j++)
            {                
                if(sentence[i] == words[j])
                {
                    ind = 1;
                    break;
                }
            }
            if(ind == 0)
                sentence[i] = " _ ";
            
        }
        setHelp(sentence.join(" "));
    }
    return(
        <>
            <h2>Hangman</h2>
            <input type="text" value={inputValue} onKeyUp={HandleStartGameKeyUp} onChange={handleInputChange}/>
            <br />
            <button className="interact-button" onClick={submitHandler}>Start game</button>
            
            <div id='hangMan'>
                <img src={imageString} alt="Nema" />
            </div>

            <div id='word'>
                {strike} / 6
                <br />
                {help}
            </div>

            <div id='guessing'>
                <button onClick={handleHelp} value={'a'}>A</button>
                <button onClick={handleHelp} value={'b'}>B</button>
                <button onClick={handleHelp} value={'c'}>C</button>
                <button onClick={handleHelp} value={'d'}>D</button>
                <button onClick={handleHelp} value={'e'}>E</button>
                <button onClick={handleHelp} value={'f'}>F</button>
                <button onClick={handleHelp} value={'g'}>G</button>
                <button onClick={handleHelp} value={'h'}>H</button>
                <button onClick={handleHelp} value={'i'}>I</button>
                <button onClick={handleHelp} value={'j'}>J</button>
                <button onClick={handleHelp} value={'k'}>K</button>
                <button onClick={handleHelp} value={'l'}>L</button>
                <button onClick={handleHelp} value={'m'}>M</button>
                <button onClick={handleHelp} value={'n'}>N</button>
                <button onClick={handleHelp} value={'o'}>O</button>
                <button onClick={handleHelp} value={'p'}>P</button>
                <button onClick={handleHelp} value={'q'}>Q</button>
                <button onClick={handleHelp} value={'r'}>R</button>
                <button onClick={handleHelp} value={'s'}>S</button>
                <button onClick={handleHelp} value={'t'}>T</button>
                <button onClick={handleHelp} value={'u'}>U</button>
                <button onClick={handleHelp} value={'v'}>V</button>
                <button onClick={handleHelp} value={'w'}>W</button>
                <button onClick={handleHelp} value={'x'}>X</button>
                <button onClick={handleHelp} value={'y'}>Y</button>
                <button onClick={handleHelp} value={'z'}>Z</button>
                <div id="guessing-div">
                    <input type="text" value={gameValue} onKeyUp={HandleGuessKeyUp} onChange={handleGameChange}/>
                    <br />
                    <button className="interact-button" onClick={guess}>Guess the Word</button>
                    <p>{win}</p>
                </div>
            </div>
        </>
    );
}

export default Hangman