import scriptLoader from 'react-load-script';
import Script from 'react-load-script';

const Test = ({Id, Token}) => {
  const handleScriptCreate = (e) => {
    console.log(e)
  }

  const handleScriptError = (e) => {
    console.log(e)
  }

  const handleScriptLoad = (e) => {
    console.log(TEST_SCRIPT.start())
  }
  return (
    <div>
      hello
      <Script
        url='https://pm28k14qlj.codesandbox.io/test-external-script.js'
        onCreate={(e)=>handleScriptCreate(e)}
        onError={(e)=>handleScriptError(e)}
        onLoad={(e)=>handleScriptLoad(e)}
      />
    </div>
  )
}

export default Test
