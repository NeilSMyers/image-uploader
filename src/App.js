import React from "react"
import request from "superagent"

const App = () => {
  const [upFile, setUpFile] = React.useState(null)
  const [pic, setPic] = React.useState()

  const fileSelected = e => {
    setUpFile(e.target.files[0])
  }

  const uploadFile = file => {
    let upload = request
      .post("https://api.cloudinary.com/v1_1/thewatchfox/image/upload")
      .field("upload_preset", "meme-images")
      .field("file", file)

    upload.end((err, response) => {
      if (err) {
        console.log("error uploading to Cloudinary", file)
      }
      if (response.body.secure_url !== "") {
        console.log(response.body.secure_url)
        setPic(response.body.secure_url)
      }
    })
  }

  return (
    <div className="App">
      <input type="file" onChange={fileSelected} />
      <button onClick={() => uploadFile(upFile)}>Upload</button>

      <img src={pic} alt="upload" />
    </div>
  )
}

export default App
