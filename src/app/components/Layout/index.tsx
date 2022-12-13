import { FC } from "react"
import Sidebar from "./Sidebar"

interface Props {}

const Layout = ({ children, ...props }) => (
  <div className="flex all-Campton">
    <Sidebar showSignlerArret={props.showSignlerArret} isDashboard={props.isDashboard} />
    <div className="w-full md:ml-60 ml-0">
      <div className="px-6 py-8 bg-gray-bg min-h-screen">{children}</div>
    </div>
  </div>
)

Layout.Header = ({ children }) => (
  <div className="flex justify-between items-center mb-3.5 ml-12 md:ml-0">{children}</div>
)

export default Layout
