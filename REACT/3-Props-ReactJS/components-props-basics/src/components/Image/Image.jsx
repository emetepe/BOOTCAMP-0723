import "./Image.css"

const Image = (props) => {

  const { imgSrc, imgAlt, imgWidth, imgHeight } = props;

  return (
    <div><img src={imgSrc} alt={imgAlt} width={imgWidth} height={imgHeight}/></div>
  )
}

export default Image