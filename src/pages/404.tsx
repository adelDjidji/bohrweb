import * as React from "react"
import { Button, Result } from "antd"

const NotFoundPage = () => (
  <div style={{background: 'linear-gradient(180deg, #581af1, #713d94)'}} className="text-center  all-Campton text-white">
    <header className=" text-white p-6 flex items-center justify-start px-10">
      <img
        className="w-24 mr-6"
        src="/bohr.png"
        alt="Bohr Energie Logo"
      />
    </header>
    <body className="min-h-screen">
      <Result
        status="404"
        title={<h1 className="text-white font-bold">Page Not Found</h1>}
        subTitle={<p className="text-white">Desolé, Cette page n'existe pas.</p>}
        extra={<Button href="/" type="primary">Revenir au site</Button>}
      />
    </body>
  </div>
)

export default NotFoundPage
