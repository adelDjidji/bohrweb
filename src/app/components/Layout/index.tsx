import { FC } from "react"
import Sidebar from "./Sidebar"

interface Props {}

const Layout = ({ children, ...props }) => (
  <div className="flex all-Campton">
    <Sidebar showSignlerArret={props.showSignlerArret} showContactUs={props.showContactUs} isDashboard={props.isDashboard} />
    <div className="w-full md:ml-60 ml-0">
      <div className="px-6 py-8 bg-gray-bg min-h-screen">{children}</div>
    </div>
  </div>
)

Layout.Header = ({ respo=true, children }) => (
  <div className={`flex ${respo ? 'flex-col md:flex-row  items-start md:items-center' : 'flex-row items-center'} flex-wrap justify-between  mb-3.5 ml-12 md:ml-0 gap-y-4`}>{children}</div>
)

export default Layout
