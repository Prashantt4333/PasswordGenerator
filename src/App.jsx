import { useCallback, useEffect, useState,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "~_-@#$%*?></|{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass); 
  }, [length, numberAllow, charAllow, setPassword]);

  // useRef Hook
  const PasswordRef = useRef(null)

  const copyPassword = useCallback(()=>{
    PasswordRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllow, charAllow, setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md text-orange-500 rounded-lg bg-gray-800 px-4 py-3 my-8">
        <h1 className="text-white text-center my-3 ">Password Generator</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={PasswordRef}
          />
          <button
           className="outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700"
           onClick={copyPassword}
           
           >copy
            
          </button>
        </div>
        <div className="flex gap-x-2 text-sm">
          <div className="item-center flex gap-x-1">
            <input 
              type="range"
              min={5} 
              max={50}
              value={length}
              className="cursor-pointer" 
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label className="ms-2">Length: {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={numberAllow}
              id="numberInput"
              onChange={()=>{
                setNumberAllow((prev)=>!prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input 
              type="checkbox" 
              defaultChecked={charAllow}
              id="charInput"
              onChange={()=>{
                setCharAllow((prev)=>!prev);
              }}
            />
            <label htmlFor="charInput">Chatcter</label>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
