import { useEffect, useState } from 'react'
import './App.css'
import PMaxwell_Resume from './assets/Patrice Maxwell.pdf'
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import taskbyRice from './assets/rice_codesLOGOS/RiceCodes.png'

function App() {
  const [count, setCount] = useState(0)
  const [countlog, setCountLog] = useState<number[]>([count])
  const [step , setStep] = useState<number>(1)
  const [modal, setModal] = useState('closed'); 

    const toggleModal = () => {
    setModal((currModal) => (currModal === 'closed' ? 'open' : 'closed'));
  };
  const increment = () =>{
    setCount(prevct => {
      const next = prevct + step;
      console.log(countlog)
      setCountLog(log => [...log, next]);
      console.log(countlog)
      return next;
    })
}

  const decrement = () =>{
     setCount(prevct => {
      const next = prevct - step;
      setCountLog(log => [...log, next]);
    
      return next;
  })
}
  const reset = () =>{
    setCount(0)
    setCountLog([])
    setStep(1)
  }
 
  const handlestepChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  }
  useEffect(() => {
      console.log(countlog)
      localStorage.setItem('count', JSON.stringify(count));
  },[countlog])


 useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown'){ 
          decrement()
 
      }else if(event.key === 'ArrowUp'){
          
        increment()
      }

    }
      
    window.addEventListener('keydown' , handleKeyDown)

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
    
    },[])

  

  return (
    <>
    <div className="wrapper">
      <div className={`container container-${modal}`}>

        <div className='nav__about-me--container'>
                  <RxHamburgerMenu onClick={toggleModal}/>
        </div>
        <div className="card--wrapper">

          <div className="card">
              <h1>Counter</h1>
              <div>Current Count:{count}</div>

              <div>

              <button onClick={increment}>+{step}</button>
              <button onClick={decrement}>-{step}</button>
              <button onClick={reset}>reset</button>

              </div>

              <div>
                <h5>Count History:</h5>
                {countlog.map((item , index )=> <span key={index}>{item} </span>)}
                
              </div>

              <form className='edit-step--wrapper' onSubmit={handlestepChange}>

                <label htmlFor="editStep">Wanna Change the Step value??</label>


                <div>
                <input type="number" value={step} onChange ={e => setStep(Number(e.target.value))}/>
                <button type='submit'>new Step</button>
                </div>
              </form>
          </div>
        </div>
      </div>
      <div className={`about-me about-${modal}`}>
          <div className='nav__about--container'>
            <RxCross2 onClick={toggleModal}/>
          </div>
            <ul className="social__links">
                <li className="footer__link"><a href="https://app.joinhandshake.com/profiles/gqqjmh" target="_blank">HandShake</a></li>
                <li className="footer__link"><a href="https://https://github.com/MsRice" target="_blank">Github</a></li>
                <li className="footer__link"><a href="https://www.linkedin.com/in/patrice-maxwell" target="_blank">LinkedIn</a></li>
                <li className="footer__link"><a href="https://www.thegrainofrice.com/patricemaxwell" target="_blank">GrainofRice.com</a></li>
                <li className="footer__link"><a href={PMaxwell_Resume} target="_blank">Download CV</a></li>
            </ul>
            <div className="about__image--wrapper">
              <img className="about__image--img"src={taskbyRice} alt="" />
            </div>
        </div>
   </div>
    </>
  )
}

export default App
