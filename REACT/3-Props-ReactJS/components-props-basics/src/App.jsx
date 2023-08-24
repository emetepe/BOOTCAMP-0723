import './App.css'
import "./components/index"
import Title from './components/Title/Title'
import SubTitle from './components/Subtitle/SubTitle'
import Image from './components/Image/Image'
import Paragraph from './components/Paragraph/Paragraph'


const App = () => {
  const titleH1 = "Título";
  const subtitleH2 = "Subtítulo";
  const imgSrc = "Source de la imagen";
  const imgAlt = "Alt de la imagen";
  const imgWidth = "150px";
  const imgHeight = "150px";


  return (
    <>
      <Title name={titleH1}/>
      <SubTitle name={subtitleH2}/>
      <Image src={imgSrc} alt={imgAlt} width={imgWidth} height={imgHeight}/>
      <Paragraph/>
    </>
  )
}

export default App