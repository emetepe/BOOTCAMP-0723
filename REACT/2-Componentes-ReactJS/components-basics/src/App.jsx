import { useState } from 'react'
import './App.css'
import "./components/index"
import Title from './components/Title/Title'
import SubTitle from './components/Subtitle/SubTitle'
import Image from './components/Image/Image'
import Paragraph from './components/Paragraph/Paragraph'


const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Title/>
      <SubTitle/>
      <Image/>
      <Paragraph/>
    </>
  )
}

export default App